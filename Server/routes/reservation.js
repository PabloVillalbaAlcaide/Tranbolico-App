var express = require("express");
const reservationController = require("../controllers/reservationController");
const verifyToken = require("../middlewares/verifyToken");
const verifyAuth = require("../middlewares/verifyAuthReservations");
var router = express.Router();

router.get('/oneWayTrip', reservationController.oneWayTrip)
router.get('/returnTrip', reservationController.returnTrip)
router.get("/historical/:id?", verifyAuth, reservationController.historical)
router.get("/nextReservations/:id?", verifyAuth, reservationController.nextReservations)
router.put("/cancelReservation", verifyToken, reservationController.cancelReservation)
router.get("/getSchedules", verifyToken, reservationController.getSchedules)
router.post("/setReservation", verifyToken, reservationController.setReservation)

module.exports = router