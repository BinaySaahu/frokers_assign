const express = require("express");
const auth = require("../middleware/validator")
const router = express.Router();
const userController = require("../controllers/userController")

router.use(auth) //validator which authenticates user each time they make a request to /user

router.get("/",userController.userDataController)

module.exports = router;