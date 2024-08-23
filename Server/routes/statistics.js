var express = require("express");
const statisticsController = require("../controllers/statisticsController");
var router = express.Router();
const verifyAdmin = require("../middlewares/verifyAdmin");

router.get("/statisticsUsers", verifyAdmin, statisticsController.statisticsUsers);
router.get("/statisticsGenre", verifyAdmin, statisticsController.statisticsGenre);
router.get("/statisticsAge", verifyAdmin, statisticsController.statisticsAge);
router.get("/statisticsRoutes", verifyAdmin, statisticsController.statisticsRoutes);
router.get("/statisticsCity", verifyAdmin, statisticsController.statisticsCity);

module.exports = router