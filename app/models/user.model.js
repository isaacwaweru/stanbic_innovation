const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const UserSchema = mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    gender: { type: String },
    password: { type: String },
    role: { type: String },
    location: { type: String },
  },
  {
    timestamps: true,
  }
);
UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", UserSchema);
