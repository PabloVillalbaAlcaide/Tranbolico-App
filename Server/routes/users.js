var express = require("express");
const userController = require("../controllers/userController");
var router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const { validateRules } = require("../middlewares/usersValidators");

router.post("/registerUser",validateRules, userController.registerUser);
router.post("/loginUser", userController.loginUser);
router.put("/verifyUser", userController.verifyUser);

module.exports = router;
