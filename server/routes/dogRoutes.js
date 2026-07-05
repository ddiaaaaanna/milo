const express = require("express");
const dogController = require("../controller/dogController");
const router = express.Router();
const { auth } = require("../middleware/auth");

router.get("/dogs", auth, dogController.getDogs);
router.get("/dogs/:id", dogController.getDog);
router.post("/dogs", dogController.addDog);
router.delete("/dogs/:id", dogController.deleteDog);
router.put("/dogs/:id", dogController.updateDog);

module.exports = router;
