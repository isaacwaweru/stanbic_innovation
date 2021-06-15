const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const LogsSchema = mongoose.Schema(
  {
    logName: { type: String },
    user_id: { type: String },
    // Array of logs
    logs: [],
  },
  {
    timestamps: true,
  }
);

LogsSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Logs", LogsSchema);
