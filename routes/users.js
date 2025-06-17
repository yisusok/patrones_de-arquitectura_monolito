const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/register", usersController.showRegister);
router.post("/register", usersController.register);

router.get("/login", usersController.showLogin);
router.post("/login", usersController.login);

module.exports = router;
