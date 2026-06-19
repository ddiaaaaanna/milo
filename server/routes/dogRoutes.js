const express = require("express");
const dogController = require("../controller/dogController");
const router = express.Router();

router.get("/dogs", dogController.getDogs);
router.post("/dogs", dogController.addDog);
router.delete("/dogs/:id", dogController.deleteDog);
router.put("/dogs/:id", dogController.updateDog);

module.exports = router;
