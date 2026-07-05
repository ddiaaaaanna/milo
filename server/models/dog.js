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
    weight: { type: String },
    microchip: { type: String },
    allergies: { type: [String] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

const Dog = mongoose.model("Dog", DogSchema);

module.exports = Dog;
