const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = require("./db");
const { fetchProducts } = require("./services/apiService");

// test root
app.get("/", (req, res) => {
  res.send("API is running");
});

// ambil & simpan data dari API eksternal
app.get("/fetch", async (req, res) => {
  try {
    const products = await fetchProducts();

    if (!products || products.length === 0) {
      return res.json({ message: "Tidak ada data dari API." });
    }

    await db.query("DELETE FROM products");

    for (const p of products) {
      const title = p.title || "Unknown";
      const price = Number(p.price) || 0;
      const rating = Number(p.rating) || 0;

      await db.query(
        "INSERT INTO products (title, price, rating) VALUES (?, ?, ?)",
        [title, price, rating],
      );
    }

    res.json({
      message: `${products.length} produk berhasil disimpan ke MySQL!`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ambil semua produk
app.get("/products", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM products");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ambil produk by id
app.get("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [results] = await db.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// update produk
app.put("/product/:id", async (req, res) => {
  try {
    const { title, price, rating } = req.body;
    const id = req.params.id;

    if (!title || price === undefined || rating === undefined) {
      return res.status(400).json({
        error: "title, price, dan rating wajib diisi.",
      });
    }

    const [result] = await db.query(
      "UPDATE products SET title=?, price=?, rating=? WHERE id=?",
      [title, Number(price), Number(rating), id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Produk tidak ditemukan." });
    }

    res.json({ message: "Produk berhasil diupdate!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// stats
app.get("/stats", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM products");

    if (results.length === 0) {
      return res.json({ avgPrice: 0, maxPrice: 0 });
    }

    const avgPrice =
      results.reduce((sum, p) => sum + Number(p.price), 0) / results.length;

    const maxPrice = Math.max(...results.map((p) => Number(p.price)));

    res.json({ avgPrice, maxPrice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
