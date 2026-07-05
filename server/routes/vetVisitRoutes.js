const express = require("express");
const vetVisitController = require("../controller/vetVisitController");
const router = express.Router();
const { auth } = require("../middleware/auth");

router.get("/dogs/:dogId/visits", auth, vetVisitController.getVisits);
router.post("/visits", auth, vetVisitController.addVisit);
router.delete("/visits/:id", auth, vetVisitController.deleteVisit);
router.put("/visits/:id", auth, vetVisitController.updateVisit);

module.exports = router;
