const sqlite3 = require("sqlite3").verbose();
const path = require("path");

class Database {
  constructor() {
    // Conectar a la base de datos
    this.db = new sqlite3.Database(
      path.join(__dirname, "monolito.db"),
      (err) => {
        if (err) {
          console.error("Error al conectar con SQLite:", err.message);
        } else {
          console.log("Conectado a SQLite");
        }
      }
    );
  }

  getDb() {
    return this.db;
  }
}

module.exports = new Database();
