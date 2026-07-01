const Dog = require("../models/dog");
const Training = require("../models/training");
const defaultExercises = require("../data/defaultExercises");

function createDefaultExercises(dogId) {
  const exercisesWithDogId = defaultExercises.map((ex) => ({
    ...ex,
    dogId: dogId,
  }));
  Training.insertMany(exercisesWithDogId)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

const addDog = (req, res) => {
  const newDog = new Dog(req.body);

  newDog
    .save()
    .then((result) => {
      res.send(result);
      createDefaultExercises(result._id);
    })
    .catch((error) => console.log(error));
};

const deleteDog = (req, res) => {
  const id = req.params.id;

  Dog.findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const updateDog = (req, res) => {
  const id = req.params.id;

  Dog.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const getDog = (req, res) => {
  const id = req.params.id;
  Dog.findById(id)
    .then((result) => res.json(result))
    .catch((error) => console.log(error));
};

const getDogs = (req, res) => {
  Dog.find()
    .then((result) => res.json(result))
    .catch((error) => console.log(error));
};

module.exports = {
  getDogs,
  getDog,
  addDog,
  deleteDog,
  updateDog,
};
