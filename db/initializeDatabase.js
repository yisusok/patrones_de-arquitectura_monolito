const path = require("path");
const db = require("./database").getDb();

function createTables() {
  db.serialize(() => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL
      )
    `,
      (err) => {
        if (err) {
          console.error("Error al crear la tabla productos:", err.message);
        } else {
          console.log("Tabla productos creada o ya existe.");
        }
      }
    );
  });
}

module.exports = { createTables };
