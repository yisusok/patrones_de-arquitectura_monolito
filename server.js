const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const { createTables } = require("./db/initializeDatabase");

const app = express();
const PORT = process.env.PORT || 8000;

createTables();

app.engine("hbs", engine({ extname: ".hbs", defaultLayout: "mainLayout" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.locals.usuarioActual = req.app.locals.usuarioActual || null;
  next();
});

function authMiddleware(req, res, next) {
  if (!req.app.locals.usuarioActual) {
    return res.redirect("/login");
  }
  next();
}

const productosRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const sucursalesRouter = require("./routes/sucursales");
const ventasRouter = require("./routes/ventas");
const reportesRouter = require("./routes/reportes");
const proveedoresRouter = require("./routes/proveedores");

app.use("/products", authMiddleware, productosRouter);
app.use("/sucursales", authMiddleware, sucursalesRouter);
app.use("/ventas", authMiddleware, ventasRouter);
app.use("/reportes", authMiddleware, reportesRouter);
app.use("/proveedores", authMiddleware, proveedoresRouter);

app.use("/", usersRouter);

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use((req, res) => {
  res.status(404).render("error", { mensaje: "Página no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
