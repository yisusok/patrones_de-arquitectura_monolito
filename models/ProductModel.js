const db = require("../db/database").getDb();

class ProductModel {
  getBySucursalId(sucursalId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM productos WHERE sucursalId = ? ORDER BY id ASC`;
      db.all(sql, [sucursalId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  create({ nombre, precio, cantidad, sucursalId }) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO productos (nombre, precio, cantidad, sucursalId) VALUES (?, ?, ?, ?)`;
      db.run(sql, [nombre, precio, cantidad, sucursalId], function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    });
  }

  update(id, { nombre, precio, cantidad }) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE productos SET nombre = ?, precio = ?, cantidad = ? WHERE id = ?`;
      db.run(sql, [nombre, precio, cantidad, id], function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }

  // Opcional: método para obtener producto por id
  getById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM productos WHERE id = ?`;
      db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
}

module.exports = ProductModel;
