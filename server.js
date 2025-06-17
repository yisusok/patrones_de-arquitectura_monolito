const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const { createTables } = require("./db/initializeDatabase");

const app = express();
const PORT = process.env.PORT || 8000;

// Crear tablas si no existen
createTables();

// Configurar Handlebars
app.engine("hbs", engine({ extname: ".hbs", defaultLayout: "mainLayout" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Servir archivos estáticos (CSS, JS, imágenes, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Middleware para leer datos de formularios
app.use(express.urlencoded({ extended: true }));

// Middleware para pasar usuario actual a todas las vistas
app.use((req, res, next) => {
  res.locals.usuarioActual = req.app.locals.usuarioActual || null;
  next();
});

// Middleware de autenticación
function authMiddleware(req, res, next) {
  if (!req.app.locals.usuarioActual) {
    return res.redirect("/login");
  }
  next();
}

// Importar rutas
const productosRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const sucursalesRouter = require("./routes/sucursales");

// Rutas
app.use("/products", authMiddleware, productosRouter); // protegida
app.use("/sucursales", authMiddleware, sucursalesRouter); // protegida
app.use("/", usersRouter); // login, logout, registro

// Redirección raíz → login
app.get("/", (req, res) => {
  res.redirect("/login");
});

// 404
app.use((req, res) => {
  res.status(404).render("error", { mensaje: "Página no encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
