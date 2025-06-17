// controllers/usersController.js

const UserModel = require("../models/usersModel");
const userModel = new UserModel();

// Renderiza la vista de login
exports.showLogin = (req, res) => res.render("login");

// Renderiza la vista de registro
exports.showRegister = (req, res) => res.render("register");

// Registro de nuevo usuario
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.findByEmail(email);
    if (user) return res.status(400).send("Ya existe ese email");
    await userModel.createUser({ name, email, password });
    res.redirect("/login");
  } catch (err) {
    res.status(500).send("Error en el registro");
  }
};

// Login de usuario y guardado de "sesión" simulada en app.locals.usuarioActual
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).send("Credenciales inválidas");
    }

    // Guardamos el usuario en app.locals para usarlo después (simula sesión)
    req.app.locals.usuarioActual = user;

    res.redirect("/sucursales");
  } catch (err) {
    res.status(500).send("Error en el login");
  }
};

// Logout: limpiamos la "sesión" simulada
exports.logout = (req, res) => {
  req.app.locals.usuarioActual = null;
  res.redirect("/login");
};
