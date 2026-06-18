const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DogSchema = new Schema(
  {
    name: { type: String, required: true },
    breed: { type: String },
    birthday: { type: Date },
    photo: { type: String },
    notes: { type: String },
    gender: { type: String },
  },
  { timestamps: true },
);

const Dog = mongoose.model("Dog", DogSchema);

module.exports = Dog;
