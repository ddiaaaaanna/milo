const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.get("/user/:id", userController.getUser);
router.post("/user", userController.addUser);
router.delete("/user/:id", userController.deleteUser);
router.put("/user/:id", userController.updateUser);

module.exports = router;
