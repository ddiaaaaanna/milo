const Training = require("../models/training");

const addExercise = (req, res) => {
  const newExercise = new Training(req.body);

  newExercise
    .save()
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const deleteExercise = (req, res) => {
  const id = req.params.id;

  Training.findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const updateExercise = (req, res) => {
  const id = req.params.id;

  Training.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const getExercise = (req, res) => {
  const id = req.params.id;
  Training.findById(id)
    .then((result) => res.json(result))
    .catch((error) => console.log(error));
};

const getExercises = (req, res) => {
  const dogId = req.params.dogId;
  Training.find({ dogId: dogId })
    .then((result) => res.json(result))
    .catch((error) => console.log(error));
};

module.exports = {
  getExercise,
  getExercises,
  addExercise,
  deleteExercise,
  updateExercise,
};
