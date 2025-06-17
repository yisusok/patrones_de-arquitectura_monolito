const express = require("express");
const router = express.Router();
const db = require("../db/database").getDb();

router.get("/sucursal/:id", (req, res) => {
  const sucursalId = req.params.id;

  const query = `
    SELECT 
      productos.nombre AS producto,
      SUM(ventas.cantidad) AS total_vendido,
      SUM(ventas.precio * ventas.cantidad) AS ingresos
    FROM ventas
    INNER JOIN productos ON productos.id = ventas.productoId
    WHERE ventas.sucursalId = ?
    GROUP BY productos.id
  `;

  db.all(query, [sucursalId], (err, rows) => {
    if (err) {
      console.error("Error al consultar reportes:", err.message);
      return res.status(500).render("error", { mensaje: "Error al obtener reportes" });
    }

    res.render("reportes", {
      ventas: rows,
      sucursalId
    });
  });
});

module.exports = router;
