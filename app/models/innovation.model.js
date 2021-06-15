const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const InnovationSchema = mongoose.Schema(
  {
    title: { type: String },
    category: { type: String },
    problem: { type: String },
    proposedSolution: { type: String },
    status: { type: String },
    teamId: { type: String },
    comment: { type: String },
    judges: [],
  },
  {
    timestamps: true,
  }
);

InnovationSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Innovation", InnovationSchema);
