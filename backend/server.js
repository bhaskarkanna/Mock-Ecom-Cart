// --- Vibe Commerce Mock E-Com Backend v3.2 ---
// Bhaskar Kanna Internship Assignment

const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

// --------------------- DATABASE SETUP ---------------------
const db = new sqlite3.Database(path.join(__dirname, "db.sqlite"));

// Create tables if not exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      category TEXT,
      price REAL,
      image_url TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER,
      qty INTEGER,
      FOREIGN KEY(productId) REFERENCES products(id)
    )
  `);
});

// --------------------- PRODUCT SEED ---------------------
const seedProducts = () => {
  db.all("SELECT COUNT(*) AS count FROM products", (err, rows) => {
    if (rows[0].count === 0) {
      const products = [
        { id: 1, name: "Classic Denim Jacket", category: "Fashion", price: 59.99, image_url: "http://localhost:4000/images/Classic%20Denim%20Jacket.jpg" },
        { id: 2, name: "Wireless Earbuds", category: "Tech", price: 39.99, image_url: "http://localhost:4000/images/Wireless%20Earbuds.jpg" },
        { id: 3, name: "Stainless Travel Mug", category: "Home", price: 14.99, image_url: "http://localhost:4000/images/Stainless%20Travel%20Mug.jpg" },
        { id: 4, name: "Minimalist Backpack", category: "Accessories", price: 49.99, image_url: "http://localhost:4000/images/Minimalist%20Backpack.jpg" },
        { id: 5, name: "Smart Fitness Band", category: "Tech", price: 29.99, image_url: "http://localhost:4000/images/Smart%20Fitness%20Band.webp" },
        { id: 6, name: "Running Shoes", category: "Fashion", price: 69.99, image_url: "http://localhost:4000/images/Running%20Shoes.jpg" },
        { id: 7, name: "Cozy Knit Scarf", category: "Fashion", price: 24.99, image_url: "http://localhost:4000/images/Cozy%20Knit%20Scarf.webp" },
        { id: 8, name: "Bluetooth Speaker", category: "Tech", price: 34.99, image_url: "http://localhost:4000/images/Bluetooth%20Speaker.webp" },
        { id: 9, name: "Classic Sunglasses", category: "Accessories", price: 19.99, image_url: "http://localhost:4000/images/Classic%20Sunglasses.jpg" },
        { id: 10, name: "Ceramic Plant Pot", category: "Home", price: 22.99, image_url: "http://localhost:4000/images/Ceramic%20Plant%20Pot.webp" },
      ];

      const stmt = db.prepare("INSERT INTO products (id, name, category, price, image_url) VALUES (?, ?, ?, ?, ?)");
      products.forEach(p => stmt.run(p.id, p.name, p.category, p.price, p.image_url));
      stmt.finalize();
      console.log("✅ Seeded products.");
    }
  });
};
seedProducts();

// --------------------- API ROUTES ---------------------

// Get all products
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get cart
app.get("/api/cart", (req, res) => {
  const query = `
    SELECT c.id AS cartId, p.id AS productId, p.name, p.price, p.image_url, c.qty
    FROM cart c
    JOIN products p ON c.productId = p.id
  `;
  db.all(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const subtotal = rows.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = subtotal > 0 ? 20 : 0;
    const total = subtotal + shipping;
    res.json({ items: rows, subtotal, shipping, total });
  });
});

// Add to cart
app.post("/api/cart", (req, res) => {
  const { productId, qty } = req.body;
  db.get("SELECT * FROM cart WHERE productId = ?", [productId], (err, row) => {
    if (row) {
      db.run("UPDATE cart SET qty = qty + ? WHERE productId = ?", [qty, productId]);
    } else {
      db.run("INSERT INTO cart (productId, qty) VALUES (?, ?)", [productId, qty]);
    }
    res.json({ message: "Added to cart" });
  });
});

// Update quantity
app.put("/api/cart/:id", (req, res) => {
  const { id } = req.params;
  const { qty } = req.body;
  db.run("UPDATE cart SET qty = ? WHERE id = ?", [qty, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// Delete item
app.delete("/api/cart/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM cart WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Checkout
app.post("/api/checkout", (req, res) => {
  const { cartItems, name, email } = req.body;
  if (!cartItems || cartItems.length === 0)
    return res.status(400).json({ error: "Cart is empty" });

  db.all(
    "SELECT * FROM products WHERE id IN (" + cartItems.map(() => "?").join(",") + ")",
    cartItems.map(i => i.productId),
    (err, products) => {
      if (err) return res.status(500).json({ error: err.message });

      const items = cartItems.map(i => {
        const product = products.find(p => p.id === i.productId);
        return {
          productId: i.productId,
          name: product.name,
          qty: i.qty,
          unitPrice: product.price,
          lineTotal: (product.price * i.qty),
          image_url: product.image_url
        };
      });

      const total = items.reduce((sum, i) => sum + i.lineTotal, 0);
      const receipt = {
        id: "ORD-" + Date.now(),
        timestamp: new Date().toISOString(),
        customer: { name, email },
        items,
        total
      };

      db.run("DELETE FROM cart");
      res.json({ receipt });
    }
  );
});

// --------------------- SERVER START ---------------------
app.listen(PORT, () => console.log(`🚀 Mock E-Com backend running on port ${PORT}`));
