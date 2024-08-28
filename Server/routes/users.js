var express = require("express");
const userController = require("../controllers/userController");
var router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const { validateRules } = require("../middlewares/usersValidators");
const multerSingle = require("../middlewares/multerSingle");

router.post("/registerUser", validateRules, userController.registerUser);
router.post("/loginUser", validateRules, userController.loginUser);
router.post("/recoverPassword", userController.recoverPassword);
router.post("/changePassword", validateRules, userController.changePassword);
router.put("/verifyUser", userController.verifyUser);
router.get("/getOneUser", verifyToken, userController.getOneUser);
router.put(
  "/editOneUser",
  validateRules,
  verifyToken,
  multerSingle("users"),
  userController.editOneUser
);

module.exports = router;
