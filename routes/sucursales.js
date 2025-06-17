const express = require("express");
const router = express.Router();

const sucursalController = require("../controllers/sucursalesController");

router.get("/", sucursalController.listarSucursales);

router.get("/:id", sucursalController.obtenerSucursal);

router.post("/", sucursalController.crearSucursal);

router.put("/:id", sucursalController.actualizarSucursal);

router.delete("/:id", sucursalController.eliminarSucursal);

module.exports = router;
