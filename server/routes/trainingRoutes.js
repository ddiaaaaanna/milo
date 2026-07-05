const express = require("express");
const trainingController = require("../controller/trainingController");
const router = express.Router();
const { auth } = require("../middleware/auth");

router.get("/dogs/:dogId/training", auth, trainingController.getExercises);
router.post("/training", auth, trainingController.addExercise);
router.delete("/training/:id", auth, trainingController.deleteExercise);
router.put("/training/:id", auth, trainingController.updateExercise);

module.exports = router;
