const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = require("./db");
const { fetchProducts } = require("./services/apiService");

// =====================
// ROOT
// =====================
app.get("/", (req, res) => {
  res.send("API is running");
});

// =====================
// TEST DB CONNECTION
// =====================
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS ok");
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// FETCH + SAVE DATA
// =====================
app.get("/fetch", async (req, res) => {
  try {
    const products = await fetchProducts();

    if (!products || products.length === 0) {
      return res.json({ message: "Tidak ada data dari API." });
    }

    // reset data (lebih cepat dari DELETE)
    await db.query("TRUNCATE TABLE products");

    // bulk insert (FIX IMPORTANT)
    const values = products.map((p) => [
      p.title || "Unknown",
      Number(p.price) || 0,
      Number(p.rating) || 0,
    ]);

    await db.query("INSERT INTO products (title, price, rating) VALUES ?", [
      values,
    ]);

    res.json({
      message: `${products.length} produk berhasil disimpan`,
    });
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// =====================
// GET ALL PRODUCTS
// =====================
app.get("/products", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// GET BY ID
// =====================
app.get("/product/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// UPDATE PRODUCT
// =====================
app.put("/product/:id", async (req, res) => {
  try {
    const { title, price, rating } = req.body;

    if (!title || price === undefined || rating === undefined) {
      return res.status(400).json({
        error: "title, price, rating wajib diisi",
      });
    }

    const [result] = await db.query(
      "UPDATE products SET title=?, price=?, rating=? WHERE id=?",
      [title, Number(price), Number(rating), req.params.id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    res.json({ message: "Berhasil update produk" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// STATS (OPTIMIZED SQL)
// =====================
app.get("/stats", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        AVG(price) AS avgPrice,
        MAX(price) AS maxPrice
      FROM products
    `);

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// 404
// =====================
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
