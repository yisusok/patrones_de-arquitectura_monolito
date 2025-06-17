const ReportesModel = require("../models/reportesModel");

exports.verReporte = async (req, res) => {
  const idSucursal = req.params.idSucursal;
  const tipo = req.query.tipo || "detalle"; 

  try {
    if (tipo === "totales") {
      const totales = await ReportesModel.getTotalesPorSucursal(idSucursal);
      res.render("reportes", { idSucursal, tipo, totales });
    } else {
      const ventas = await ReportesModel.getVentasPorSucursal(idSucursal);
      res.render("reportes", { idSucursal, tipo, ventas });
    }
  } catch (error) {
    res.status(500).render("error", { mensaje: "Error al obtener reporte", error });
  }
};
