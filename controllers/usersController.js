
const UserModel = require("../models/usersModel");
const userModel = new UserModel();

exports.showLogin = (req, res) => res.render("login");

exports.showRegister = (req, res) => res.render("register");

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

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).send("Credenciales inválidas");
    }

    req.app.locals.usuarioActual = user;

    res.redirect("/sucursales");
  } catch (err) {
    res.status(500).send("Error en el login");
  }
};

exports.logout = (req, res) => {
  req.app.locals.usuarioActual = null;
  res.redirect("/login");
};
