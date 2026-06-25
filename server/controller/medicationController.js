const Medication = require("../models/medication");

const addMedication = (req, res) => {
  const newMedication = new Medication(req.body);

  newMedication
    .save()
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const deleteMedication = (req, res) => {
  const id = req.params.id;

  Medication.findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const updateMedication = (req, res) => {
  const id = req.params.id;

  Medication.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const getMedication = (req, res) => {
  const id = req.params.id;
  Medication.findById(id)
    .then((result) => res.json(result))
    .catch((error) => console.log(error));
};

const getMedications = (req, res) => {
  const dogId = req.params.dogId;
  Medication.find({ dogId: dogId })
    .then((result) => res.json(result))
    .catch((error) => console.log(error));
};

module.exports = {
  getMedications,
  getMedication,
  addMedication,
  deleteMedication,
  updateMedication,
};
