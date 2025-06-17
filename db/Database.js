const sqlite3 = require("sqlite3").verbose();
const path = require("path");

class Database {
  constructor() {
    this.db = new sqlite3.Database(
      path.join(__dirname, "monolito.db"),
      (err) => {
        if (err) {
          console.error("Error al conectar con SQLite:", err.message);
        } else {
          console.log("Conectado a SQLite");
          this.createTables();
        }
      }
    );
  }

  getDb() {
    return this.db;
  }

  createTables() {
    this.db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )`,
      (err) => {
        if (err) console.error("Error al crear tabla users:", err.message);
        else console.log("Tabla users lista.");
      }
    );

    this.db.run(
      `CREATE TABLE IF NOT EXISTS sucursales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        direccion TEXT,
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
      )`,
      (err) => {
        if (err) console.error("Error al crear tabla sucursales:", err.message);
        else console.log("Tabla sucursales lista.");
      }
    );

    this.db.run(
      `CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        precio REAL NOT NULL,
        cantidad INTEGER NOT NULL DEFAULT 0,
        sucursalId INTEGER NOT NULL,
        FOREIGN KEY (sucursalId) REFERENCES sucursales(id)
      )`,
      (err) => {
        if (err) console.error("Error al crear tabla productos:", err.message);
        else console.log("Tabla productos lista.");
      }
    );

     this.db.run(
    `ALTER TABLE productos ADD COLUMN cantidad INTEGER NOT NULL DEFAULT 0`,
    (err) => {
      // Ignorá el error si la columna ya existe, porque SQLite lanzará error si se intenta agregar dos veces
      if (err && !err.message.includes("duplicate column name")) {
        console.error("Error al agregar columna cantidad:", err.message);
      } else {
        console.log("Columna cantidad lista o ya existe.");
      }
    }
  );
  }
}

module.exports = new Database();
