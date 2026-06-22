const Dog = require("../models/dog");

const addDog = (req, res) => {
  const newDog = new Dog({
    name: "Marnie",
    gender: "Male",
    birthday: new Date("2023-06-08"),
    breed: "Labrador Retriever",
    notes: "My best friend",
  });
  newDog
    .save()
    .then((result) => res.send(result))
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
  const body = { name: "edited" };

  Dog.findByIdAndUpdate(id, body)
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
