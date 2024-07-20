const express = require("express");
const auth = require("../middleware/validator")
const router = express.Router();
const userController = require("../controllers/userController")

router.use(auth)

router.get("/",userController.userDataController)

module.exports = router;