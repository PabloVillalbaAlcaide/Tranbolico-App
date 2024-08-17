var express = require("express");
const adminController = require("../controllers/adminController");
const verifyToken = require("../middlewares/verifyToken");
var router = express.Router();

const verifyAdmin = (req, res, next) => {
  if (req.user && req.user_type === 1) {
    next();
  } else {
    res.status(403).send("Aceso denegado: no eres administrador");
  }
};

router.get("/admin", verifyToken, verifyAdmin, adminController.getAdmin);
router.post("/createRoute", verifyToken, verifyAdmin, adminController.createRoute);
router.put("/editRoute/:id", verifyToken, verifyAdmin, adminController.editRoute);
router.get("/viewUser", verifyToken, verifyAdmin, adminController.viewUser);

module.exports = router;

