const express = require("express");
const auth = require("../middleware/validator")
const router = express.Router();
const borrowController = require("../controllers/borrowController")

router.use(auth) //validator which authenticates user each time they make a request to /borrow

router.post("/",borrowController.borrowController)

module.exports = router;