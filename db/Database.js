const sqlite3 = require("sqlite3").verbose();
const path = require("path");

class Database {
  constructor() {
    this.db = new sqlite3.Database(
      path.join(__dirname, "monolito.db"),
      (err) => {
        if (err) {
          console.error("❌ Error al conectar con SQLite:", err.message);
        } else {
          console.log("✅ Conectado a SQLite");
          this.createTables();
          this.alterTableProductos();
        }
      }
    );
  }

  getDb() {
    return this.db;
  }

  createTables() {
    const queries = [
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )`,

      `CREATE TABLE IF NOT EXISTS sucursales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        direccion TEXT,
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
      )`,

      `CREATE TABLE IF NOT EXISTS proveedores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        contacto TEXT
      )`,

      `CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        precio REAL NOT NULL,
        cantidad INTEGER NOT NULL DEFAULT 0,
        sucursalId INTEGER NOT NULL,
        proveedorId INTEGER,
        FOREIGN KEY (sucursalId) REFERENCES sucursales(id),
        FOREIGN KEY (proveedorId) REFERENCES proveedores(id)
      )`,

      `CREATE TABLE IF NOT EXISTS ventas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sucursalId INTEGER NOT NULL,
        productoId INTEGER NOT NULL,
        cantidad INTEGER NOT NULL,
        precio REAL NOT NULL,
        fecha TEXT NOT NULL,
        FOREIGN KEY (sucursalId) REFERENCES sucursales(id),
        FOREIGN KEY (productoId) REFERENCES productos(id)
      )`
    ];

    queries.forEach((query) => {
      this.db.run(query, (err) => {
        if (err) console.error("❌ Error al crear tabla:", err.message);
      });
    });

    console.log("🛠️ Tablas creadas o ya existen.");
  }

  alterTableProductos() {
    this.db.all(`PRAGMA table_info(productos)`, (err, columns) => {
      if (err) return console.error("❌ Error PRAGMA:", err.message);

      const hasProveedorId = columns.some(col => col.name === "proveedorId");
      if (!hasProveedorId) {
        this.db.run(`ALTER TABLE productos ADD COLUMN proveedorId INTEGER`, (err) => {
          if (err) console.error("❌ Error al modificar tabla productos:", err.message);
          else console.log("🛠️ Columna proveedorId agregada a productos");
        });
      } else {
        console.log("✅ La columna proveedorId ya existe en productos");
      }
    });
  }
}

module.exports = new Database();
