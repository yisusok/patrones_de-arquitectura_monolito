const express = require("express");
const router = express.Router();
const proveedoresController = require("../controllers/proveedorController");

router.get("/", proveedoresController.listarProveedores);

router.get("/add", proveedoresController.formularioAgregarProveedor);

router.post("/add", proveedoresController.guardarProveedor);

module.exports = router;
