const User = require("../models/user");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  const hashedPw = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({ ...req.body, password: hashedPw });

  newUser
    .save()
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const updateUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
};

const getUser = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((result) => res.json(result))
    .catch((error) => console.log(error));
};

module.exports = {
  getUser,
  addUser,
  deleteUser,
  updateUser,
};
