// controllers/sucursalesController.js
const Sucursal = require("../models/sucursalModel");

exports.listarSucursales = async (req, res) => {
  try {
    const usuario = req.app.locals.usuarioActual;

    if (!usuario) {
      return res.redirect("/login");
    }

    const sucursales = await Sucursal.findAll({
      where: { usuarioId: usuario.id }
    });

    res.render("sucursales", { sucursales });
  } catch (error) {
    console.error("Error al listar sucursales:", error);
    res.status(500).send("Error al obtener sucursales");
  }
};
