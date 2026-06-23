const VetVisits = require("../models/vetVisits");

const addVisit = (req, res) => {
  const newVisit = new VetVisits(req.body);

  newVisit
    .save()
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const deleteVisit = (req, res) => {
  const id = req.params.id;

  VetVisits.findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const updateVisit = (req, res) => {
  const id = req.params.id;
  const body = { name: "edited" };

  VetVisits.findByIdAndUpdate(id, body)
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const getVisit = (req, res) => {
  const id = req.params.id;
  VetVisits.findById(id)
    .then((result) => res.json(result))
    .catch((error) => console.log(error));
};

const getVisits = (req, res) => {
  const dogId = req.params.dogId;
  VetVisits.find({ dogId: dogId })
    .then((result) => res.json(result))
    .catch((error) => console.log(error));
};

module.exports = {
  getVisits,
  getVisit,
  addVisit,
  deleteVisit,
  updateVisit,
};
