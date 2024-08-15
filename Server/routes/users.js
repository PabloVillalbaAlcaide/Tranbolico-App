var express = require("express");
const userController = require("../controllers/userController");
var router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const { validateRules } = require("../middlewares/usersValidators");
const multerSingle = require("../middlewares/multerSingle");

router.post("/registerUser", validateRules, userController.registerUser);
router.post("/loginUser", userController.loginUser);
router.post("/recoverPassword", userController.recoverPassword);
router.post("/changePassword", userController.changePassword);
router.put("/verifyUser", userController.verifyUser);
router.get("/getOneUser", verifyToken, userController.getOneUser);
router.put(
  "/editOneUser",
  verifyToken,
  multerSingle("users"),
  userController.editOneUser
);

module.exports = router;
