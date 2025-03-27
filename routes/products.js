const express = require("express");
const router = express.Router();
const db = require("../db/database").getDb();

// Listar products
router.get("/", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    res.render("products", { products: rows });
  });
});

// Agregar producto
router.post("/add", (req, res) => {
  const { name, price } = req.body;
  console.log();
  db.run(
    "INSERT INTO products (name, price) VALUES (?, ?)",
    [name, price],
    (err) => {
      if (err) {
        console.error(err.message);
      }
      res.redirect("/products");
    }
  );
});

// Eliminar producto
router.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) {
      console.error(err.message);
    }
    res.redirect("/products");
  });
});

module.exports = router;
