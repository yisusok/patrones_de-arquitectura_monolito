const db = require("../db/database");

class ProveedorModel {
  constructor() {
    this.db = db.getDb();
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM proveedores ORDER BY nombre ASC";
      this.db.all(sql, [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
}

module.exports = ProveedorModel;
