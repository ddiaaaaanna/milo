const express = require("express");
const trainingController = require("../controller/trainingController");
const router = express.Router();

router.get("/dogs/:dogId/training", trainingController.getExercises);
router.post("/training", trainingController.addExercise);
router.delete("/training/:id", trainingController.deleteExercise);
router.put("/training/:id", trainingController.updateExercise);

module.exports = router;
