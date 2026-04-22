const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = require("./db");
const { fetchProducts } = require("./services/apiService");

// ambil & simpan data dari API eksternal
app.get("/fetch", async (req, res) => {
  try {
    const products = await fetchProducts();

    db.query("DELETE FROM products", (err) => {
      if (err) return res.status(500).json({ error: err.message });

      let completed = 0;
      const total = products.length;

      if (total === 0) return res.json({ message: "Tidak ada data dari API." });

      products.forEach((p) => {
        const title = p.title || "Unknown";
        const price = Number(p.price) || 0;
        const rating = Number(p.rating) || 0;

        db.query(
          "INSERT INTO products (title, price, rating) VALUES (?, ?, ?)",
          [title, price, rating],
          (err) => {
            if (err) console.error("Insert error:", err.message);
            completed++;
            if (completed === total) {
              res.json({
                message: `${total} produk berhasil disimpan ke MySQL!`,
              });
            }
          },
        );
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ambil semua produk dari db
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "API Product Dashboard is running 🚀",
    endpoints: [
      "/fetch",
      "/products",
      "/product/:id",
      "/stats",
    ],
  });
});

// ambil produk by id
app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    res.json(results[0]);
  });
});

// update produk
app.put("/product/:id", (req, res) => {
  const { title, price, rating } = req.body;
  const id = req.params.id;

  if (!title || price === undefined || rating === undefined) {
    return res
      .status(400)
      .json({ error: "title, price, dan rating wajib diisi." });
  }

  db.query(
    "UPDATE products SET title=?, price=?, rating=? WHERE id=?",
    [title, Number(price), Number(rating), id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Produk tidak ditemukan." });
      res.json({ message: "Produk berhasil diupdate!" });
    },
  );
});

// stats: avg & max price
app.get("/stats", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.json({ avgPrice: 0, maxPrice: 0 });
    }

    const avgPrice =
      results.reduce((sum, p) => sum + p.price, 0) / results.length;
    const maxPrice = Math.max(...results.map((p) => p.price));

    res.json({ avgPrice, maxPrice });
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});