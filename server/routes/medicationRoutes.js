const express = require("express");
const medicationController = require("../controller/medicationController");
const router = express.Router();
const { auth } = require("../middleware/auth");

router.get(
  "/dogs/:dogId/medication",
  auth,
  medicationController.getMedications,
);
router.post("/medication", auth, medicationController.addMedication);
router.delete("/medication/:id", auth, medicationController.deleteMedication);
router.put("/medication/:id", auth, medicationController.updateMedication);

module.exports = router;
