var express = require("express");
const adminController = require("../controllers/adminController");
const verifyAdmin = require("../middlewares/verifyAdmin");
var router = express.Router();
// const verifyAdmin = (req, res, next) => {
//   if (req.user && req.user_type === 1) {
//     next();
//   } else {
//     res.status(403).send("Aceso denegado: no eres administrador");
//   }
// };
router.get("/getRoutes", verifyAdmin, adminController.getRoutes);
router.get("/searchLocations", verifyAdmin, adminController.searchLocations);
router.post("/addRoute", verifyAdmin, adminController.addRoute);
router.put("/editRoute", verifyAdmin, adminController.editRoute);
router.delete("/deleteRoute/:id", verifyAdmin, adminController.deleteRoute);
router.patch("/disableRoute", verifyAdmin, adminController.disableRoute);
router.get("/getPlanning", verifyAdmin, adminController.getPlanning);
router.get("/getPlanningRoutes", verifyAdmin, adminController.getPlanningRoutes);
router.post("/addPlanning", verifyAdmin, adminController.addPlanning);
router.delete("/delPlanning/:routeId/:planningId", verifyAdmin, adminController.delPlanning);
router.put("/editPlanning/:routeId/:planningId", verifyAdmin, adminController.editPlanning);
router.get("/viewUser", verifyAdmin, adminController.viewUser);
router.patch("/disableUser", verifyAdmin, adminController.disableUser);
router.get("/historicalUser", verifyAdmin, adminController.historicalUser);
router.get("/reservationUser", verifyAdmin, adminController.reservationUser);
module.exports = router;
