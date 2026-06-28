const Journal = require("../models/journal");

const addJournalEntry = (req, res) => {
  const newEntry = new Journal(req.body);

  newEntry
    .save()
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const deleteJournalEntry = (req, res) => {
  const id = req.params.id;

  Journal.findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const updateJournalEntry = (req, res) => {
  const id = req.params.id;

  Journal.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const getJournalEntry = (req, res) => {
  const id = req.params.id;
  Journal.findById(id)
    .then((result) => res.json(result))
    .catch((error) => console.log(error));
};

const getJournalEntries = (req, res) => {
  const dogId = req.params.dogId;
  Journal.find({ dogId: dogId })
    .then((result) => res.json(result))
    .catch((error) => console.log(error));
};

module.exports = {
  getJournalEntries,
  getJournalEntry,
  addJournalEntry,
  deleteJournalEntry,
  updateJournalEntry,
};
