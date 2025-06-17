const db = require("../db/database").getDb();

exports.getVentaForm = (req, res) => {
  const idSucursal = req.params.idSucursal;

  db.all(
    `SELECT id, nombre, cantidad, precio FROM productos WHERE sucursalId = ? AND cantidad > 0`,
    [idSucursal],
    (err, productos) => {
      if (err) {
        return res.status(500).render("error", { mensaje: "Error al cargar productos" });
      }
      res.render("ventas", { sucursalId: idSucursal, productos });
    }
  );
};

exports.postVenta = (req, res) => {
  const { sucursalId, productoId, cantidad } = req.body;
  const cant = parseInt(cantidad, 10);

  if (!sucursalId || !productoId || !cant || cant <= 0) {
    return res.status(400).render("error", { mensaje: "Datos inválidos" });
  }

  db.get(
    `SELECT cantidad, precio FROM productos WHERE id = ? AND sucursalId = ?`,
    [productoId, sucursalId],
    (err, producto) => {
      if (err || !producto) {
        return res.status(500).render("error", { mensaje: "Producto no encontrado" });
      }

      if (producto.cantidad < cant) {
        return res.status(400).render("error", { mensaje: "Stock insuficiente" });
      }

      const nuevoStock = producto.cantidad - cant;
      const precioVenta = producto.precio * cant;
      const fecha = new Date().toISOString();

      db.run(
        `INSERT INTO ventas (sucursalId, productoId, cantidad, precio, fecha) VALUES (?, ?, ?, ?, ?)`,
        [sucursalId, productoId, cant, precioVenta, fecha],
        function (err) {
          if (err) {
            return res.status(500).render("error", { mensaje: "Error al registrar venta" });
          }

          db.run(
            `UPDATE productos SET cantidad = ? WHERE id = ?`,
            [nuevoStock, productoId],
            (err) => {
              if (err) {
                return res.status(500).render("error", { mensaje: "Error al actualizar stock" });
              }
              res.redirect(`/ventas/sucursal/${sucursalId}`);
            }
          );
        }
      );
    }
  );
};
