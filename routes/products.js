const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");

router.get("/", productController.getAll);

router.post("/add", productController.create);

router.post("/delete/:id", productController.delete);

module.exports = router;
