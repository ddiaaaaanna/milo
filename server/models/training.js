const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrainingSchema = new Schema(
  {
    exerciseName: { type: String },
    difficulty: { type: String },
    description: { type: String },
    status: { type: String },
    dogId: { type: mongoose.Schema.Types.ObjectId, ref: "Dog" },
  },
  { timestamps: true },
);

const Training = mongoose.model("Training", TrainingSchema);

module.exports = Training;
