const express = require("express");

const router = express.Router();
const authController = require("../controllers/authController")

router.post("/signup",authController.registerController)

router.post("/login",authController.loginController)

module.exports = router;