const express = require("express");
const router = express.Router();
const ventasController = require("../controllers/ventasController");

router.get("/sucursal/:idSucursal", ventasController.getVentaForm);
router.post("/sucursal/venta", ventasController.postVenta);

module.exports = router;
