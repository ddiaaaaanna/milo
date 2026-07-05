const express = require("express");
const dogController = require("../controller/dogController");
const router = express.Router();
const { auth } = require("../middleware/auth");

router.get("/dogs", auth, dogController.getDogs);
router.get("/dogs/:id", auth, dogController.getDog);
router.post("/dogs", auth, dogController.addDog);
router.delete("/dogs/:id", auth, dogController.deleteDog);
router.put("/dogs/:id", auth, dogController.updateDog);

module.exports = router;
