var express = require("express");
const reservationController = require("../controllers/reservationController");
var router = express.Router();

router.get('/oneWayTrip', reservationController.oneWayTrip)
router.get('/returnTrip', reservationController.returnTrip)

module.exports = router