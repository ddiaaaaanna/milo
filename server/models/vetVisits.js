const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VetSchema = new Schema(
  {
    reason: { type: String },
    date: { type: Date },
    notes: { type: String },
    diagnosis: { type: String },
    treatment: { type: String },
    vetName: { type: String },
    dogId: { type: mongoose.Schema.Types.ObjectId, ref: "Dog" },
  },
  { timestamps: true },
);

const VetVisits = mongoose.model("VetVisits", VetSchema);

module.exports = VetVisits;
