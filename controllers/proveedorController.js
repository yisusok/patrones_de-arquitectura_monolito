const db = require("../db/database").getDb();

exports.listarProveedores = (req, res) => {
  const query = "SELECT * FROM proveedores";
  db.all(query, (err, rows) => {
    if (err) {
      console.error("Error al obtener proveedores:", err.message);
      return res.status(500).render("error", { mensaje: "Error interno al listar proveedores" });
    }
    res.render("proveedores", { proveedores: rows });
  });
};

exports.formularioAgregarProveedor = (req, res) => {
  res.render("proveedorAdd");
};

exports.guardarProveedor = (req, res) => {
  const { nombre, contacto } = req.body;

  if (!nombre || !contacto) {
    return res.render("proveedorAdd", { error: "Debe completar todos los campos." });
  }

  const query = "INSERT INTO proveedores (nombre, contacto) VALUES (?, ?)";
  db.run(query, [nombre, contacto], function (err) {
    if (err) {
      console.error("Error al agregar proveedor:", err.message);
      return res.status(500).render("error", { mensaje: "Error interno al guardar proveedor" });
    }
    res.redirect("/proveedores");
  });
};
