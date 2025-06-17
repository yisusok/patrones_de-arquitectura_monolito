const express = require("express");
const router = express.Router();

// Importamos el controlador de sucursales
const sucursalController = require("../controllers/sucursalesController");

// Ruta para listar todas las sucursales
router.get("/", sucursalController.listarSucursales);

// Ruta para obtener una sucursal por id
router.get("/:id", sucursalController.obtenerSucursal);

// Ruta para crear una sucursal nueva
router.post("/", sucursalController.crearSucursal);

// Ruta para actualizar una sucursal
router.put("/:id", sucursalController.actualizarSucursal);

// Ruta para eliminar una sucursal
router.delete("/:id", sucursalController.eliminarSucursal);

module.exports = router;
