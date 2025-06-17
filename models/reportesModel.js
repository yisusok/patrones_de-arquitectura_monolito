const db = require("../db/database").getDb();

class ReportesModel {
  static getVentasPorSucursal(idSucursal) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT ventas.id, productos.nombre AS producto, ventas.cantidad, ventas.precio, ventas.fecha
        FROM ventas
        JOIN productos ON ventas.productoId = productos.id
        WHERE ventas.sucursalId = ?
        ORDER BY ventas.fecha DESC
      `;
      db.all(sql, [idSucursal], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static getTotalesPorSucursal(idSucursal) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          COUNT(*) AS totalVentas,
          SUM(cantidad) AS totalProductosVendidos,
          SUM(cantidad * precio) AS totalIngresos
        FROM ventas
        WHERE sucursalId = ?
      `;
      db.get(sql, [idSucursal], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
}

module.exports = ReportesModel;
