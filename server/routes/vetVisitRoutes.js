const express = require("express");
const vetVisitController = require("../controller/vetVisitController");
const router = express.Router();

router.get("/dogs/:dogId/visits", vetVisitController.getVisits);
router.post("/visits", vetVisitController.addVisit);
router.delete("/visits/:id", vetVisitController.deleteVisit);
router.put("/visits/:id", vetVisitController.updateVisit);

module.exports = router;
