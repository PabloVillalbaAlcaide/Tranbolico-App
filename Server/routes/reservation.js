var express = require("express");
const reservationController = require("../controllers/reservationController");
const verifyToken = require("../middlewares/verifyToken");
var router = express.Router();

router.get('/oneWayTrip', reservationController.oneWayTrip)
router.get('/returnTrip', reservationController.returnTrip)
router.get("/historical/:id", verifyToken, reservationController.historical)
router.get("/nextReservations/:id", verifyToken, reservationController.nextReservations)
router.put("/cancelReservation", verifyToken, reservationController.cancelReservation) 

module.exports = router