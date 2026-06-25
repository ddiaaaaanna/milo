const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicationSchema = new Schema(
  {
    name: { type: String },
    dose: { type: String },
    notes: { type: String },
    reason: { type: String },
    frequency: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    dogId: { type: mongoose.Schema.Types.ObjectId, ref: "Dog" },
  },
  { timestamps: true },
);

const Medication = mongoose.model("Medication", MedicationSchema);

module.exports = Medication;
