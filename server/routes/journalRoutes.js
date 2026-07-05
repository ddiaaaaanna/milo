const express = require("express");
const journalController = require("../controller/journalController");
const router = express.Router();
const { auth } = require("../middleware/auth");

router.get("/dogs/:dogId/journal", auth, journalController.getJournalEntries);
router.post("/journal", auth, journalController.addJournalEntry);
router.delete("/journal/:id", auth, journalController.deleteJournalEntry);
router.put("/journal/:id", auth, journalController.updateJournalEntry);

module.exports = router;
