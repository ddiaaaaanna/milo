const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JournalSchema = new Schema(
  {
    photo: { type: String },
    title: { type: String },
    date: { type: Date },
    entry: { type: String },
    dogId: { type: mongoose.Schema.Types.ObjectId, ref: "Dog" },
  },
  { timestamps: true },
);

const Journal = mongoose.model("Journal", JournalSchema);

module.exports = Journal;
