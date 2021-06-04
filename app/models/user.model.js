const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const UserSchema = mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);
UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", UserSchema);
