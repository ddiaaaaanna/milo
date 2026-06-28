const express = require("express");
const journalController = require("../controller/journalController");
const router = express.Router();

router.get("/dogs/:dogId/journal", journalController.getJournalEntries);
router.post("/journal", journalController.addJournalEntry);
router.delete("/journal/:id", journalController.deleteJournalEntry);
router.put("/journal/:id", journalController.updateJournalEntry);

module.exports = router;
