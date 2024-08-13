var express = require("express");
const userController = require("../controllers/userController");
var router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

router.post("/registerUser", userController.registerUser);

module.exports = router;
