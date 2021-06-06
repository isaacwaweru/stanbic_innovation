const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const TeamSchema = mongoose.Schema(
  {
    teamName: { type: String },
    team_lead_id: { type: String },
  },
  {
    timestamps: true,
  }
);


TeamSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Team", TeamSchema);
