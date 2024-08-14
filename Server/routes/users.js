var express = require("express");
const userController = require("../controllers/userController");
var router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const { validateRules } = require("../middlewares/usersValidators");

router.post("/registerUser", validateRules, userController.registerUser);
router.post("/loginUser", userController.loginUser);
router.post("/verifyUser", userController.verifyUser);
router.get("/getOneUser", verifyToken, userController.getOneUser);
router.put("/editOneUser", verifyToken, userController.editOneUser);


module.exports = router;
