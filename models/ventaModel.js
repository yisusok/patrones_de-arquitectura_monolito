const db = require("../db/database").getDb();

class VentasModel {
  create({ sucursalId, productoId, cantidad, precio, fecha }) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO ventas (sucursalId, productoId, cantidad, precio, fecha) VALUES (?, ?, ?, ?, ?)`,
        [sucursalId, productoId, cantidad, precio, fecha],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        }
      );
    });
  }

  findBySucursalId(sucursalId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT ventas.*, productos.nombre AS nombreProducto
         FROM ventas
         INNER JOIN productos ON ventas.productoId = productos.id
         WHERE ventas.sucursalId = ?`,
        [sucursalId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
}

module.exports = VentasModel;
