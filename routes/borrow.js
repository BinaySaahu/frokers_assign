const express = require("express");
const auth = require("../middleware/validator")
const router = express.Router();
const borrowController = require("../controllers/borrowController")

router.use(auth)

router.post("/",borrowController.borrowController)

module.exports = router;