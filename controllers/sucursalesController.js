const db = require("../db/database").getDb();

exports.listarSucursales = (req, res) => {
  const usuarioActual = req.app.locals.usuarioActual;
  if (!usuarioActual) {
    return res.redirect("/login");
  }
  const userId = usuarioActual.id;
  const sql = `SELECT id, nombre, direccion FROM sucursales WHERE userId = ? ORDER BY id ASC`;
  db.all(sql, [userId], (err, rows) => {
    if (err) {
      console.error("Error al consultar sucursales:", err.message);
      return res.status(500).send("Error interno del servidor");
    }
    res.render("sucursales", { sucursales: rows, title: "Mis Sucursales" });
  });
};

exports.obtenerSucursal = (req, res) => {
  const id = req.params.id;
  const usuarioActual = req.app.locals.usuarioActual;
  if (!usuarioActual) {
    return res.redirect("/login");
  }
  const userId = usuarioActual.id;

  const sql = `SELECT id, nombre, direccion FROM sucursales WHERE id = ? AND userId = ?`;
  db.get(sql, [id, userId], (err, row) => {
    if (err) {
      console.error("Error al obtener sucursal:", err.message);
      return res.status(500).send("Error interno del servidor");
    }
    if (!row) {
      return res.status(404).send("Sucursal no encontrada");
    }
    res.json(row);
  });
};

exports.crearSucursal = (req, res) => {
  const { nombre, direccion } = req.body;
  const usuarioActual = req.app.locals.usuarioActual;
  if (!usuarioActual) {
    return res.redirect("/login");
  }
  const userId = usuarioActual.id;

  const sql = `INSERT INTO sucursales (nombre, direccion, userId) VALUES (?, ?, ?)`;
  db.run(sql, [nombre, direccion, userId], function(err) {
    if (err) {
      console.error("Error al crear sucursal:", err.message);
      return res.status(500).send("Error interno del servidor");
    }
    res.redirect("/sucursales");
  });
};

exports.actualizarSucursal = (req, res) => {
  const id = req.params.id;
  const { nombre, direccion } = req.body;
  const usuarioActual = req.app.locals.usuarioActual;
  if (!usuarioActual) {
    return res.redirect("/login");
  }
  const userId = usuarioActual.id;

  const sql = `UPDATE sucursales SET nombre = ?, direccion = ? WHERE id = ? AND userId = ?`;
  db.run(sql, [nombre, direccion, id, userId], function(err) {
    if (err) {
      console.error("Error al actualizar sucursal:", err.message);
      return res.status(500).send("Error interno del servidor");
    }
    if (this.changes === 0) {
      return res.status(404).send("Sucursal no encontrada o no autorizada");
    }
    res.redirect("/sucursales");
  });
};

exports.eliminarSucursal = (req, res) => {
  const id = req.params.id;
  const usuarioActual = req.app.locals.usuarioActual;
  if (!usuarioActual) {
    return res.redirect("/login");
  }
  const userId = usuarioActual.id;

  const sql = `DELETE FROM sucursales WHERE id = ? AND userId = ?`;
  db.run(sql, [id, userId], function(err) {
    if (err) {
      console.error("Error al eliminar sucursal:", err.message);
      return res.status(500).send("Error interno del servidor");
    }
    if (this.changes === 0) {
      return res.status(404).send("Sucursal no encontrada o no autorizada");
    }
    res.redirect("/sucursales");
  });
};
