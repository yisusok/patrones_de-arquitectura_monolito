const db = require("../db/database");

class ProductoModel {
  constructor() {
    this.db = db.getDb();
  }

  getBySucursalId(sucursalId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT productos.*, proveedores.nombre AS proveedorNombre
        FROM productos
        LEFT JOIN proveedores ON productos.proveedorId = proveedores.id
        WHERE sucursalId = ?`;
      this.db.all(sql, [sucursalId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM productos WHERE id = ?";
      this.db.get(sql, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  create({ nombre, precio, cantidad, sucursalId, proveedorId }) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO productos (nombre, precio, cantidad, sucursalId, proveedorId) VALUES (?, ?, ?, ?, ?)`;
      this.db.run(sql, [nombre, precio, cantidad, sucursalId, proveedorId || null], function(err) {
        if (err) return reject(err);
        resolve(this.lastID);
      });
    });
  }

  update(id, { nombre, precio, cantidad, proveedorId }) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE productos SET nombre = ?, precio = ?, cantidad = ?, proveedorId = ? WHERE id = ?`;
      this.db.run(sql, [nombre, precio, cantidad, proveedorId || null, id], function(err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  }
}

module.exports = ProductoModel;
