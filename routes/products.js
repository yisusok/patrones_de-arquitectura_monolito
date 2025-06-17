const express = require("express");
const router = express.Router();

const productosController = require("../controllers/productsController");

router.get("/sucursal/:id", productosController.listBySucursal);
router.get("/sucursal/:id/new", productosController.showForm);
router.post("/sucursal/:id", productosController.createProduct);
router.get("/:id/edit", productosController.showEditForm);
router.post("/:id/edit", productosController.updateProduct);

module.exports = router;
