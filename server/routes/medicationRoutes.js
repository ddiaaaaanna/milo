const express = require("express");
const medicationController = require("../controller/medicationController");
const router = express.Router();

router.get("/dogs/:dogId/medication", medicationController.getMedications);
router.post("/medication", medicationController.addMedication);
router.delete("/medication/:id", medicationController.deleteMedication);
router.put("/medication/:id", medicationController.updateMedication);

module.exports = router;
