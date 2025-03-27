const express = require("express");
const router = express.Router();
const ProductModel = require("../models/ProductModel");
const productModel = new ProductModel();

router.get("/", async (req, res) => {
  try {
    const products = await productModel.getAll();
    res.render("products", { products });
  } catch (error) {
    return res.status(500).json({ error: "Error al crear producto" });
  }
});

router.post("/add", async (req, res) => {
  const { name, price } = req.body;
  try {
    await productModel.createProduct({ name, price });
    res.redirect("/products");
  } catch (error) {
    return res.status(500).json({ error: "Error al crear producto" });
  }
});

router.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await productModel.deleteProduct(id);
    res.redirect("/products");
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar producto" });
  }
});

module.exports = router;
