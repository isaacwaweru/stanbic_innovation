const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const TeamSchema = mongoose.Schema(
    {
        teamName: { type: String, unique: true },
        // Array of members
        members: [{
            user_id: { type: String },
            firstname: { type: String },
            lastname: { type: String },
            email: { type: String },
            gender: { type: String },
            role: { type: String },
            status: { type: Boolean },
            hasTeam: { type: Boolean},
            location: { type: String },
            }]
    },
  {
    timestamps: true,
  }
);


TeamSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Team", TeamSchema);
