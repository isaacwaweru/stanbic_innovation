const Team = require("../models/team.model.js");
const Log = require("../models/logs.model.js");
const User = require("../models/user.model.js");

//Create team
exports.createLog = (req, res, next) => {
  const log = new Log({
    logName: req.body.logName,
    user_id: req.body.user_id,
    logos: req.body.logs,
  });
  log
    .save()
    .then(() => {
      res.status(201).json({
        message: "Log added successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

// Retrieve and return all logs
exports.findAllLogs = (req, res) => {
  Log.find()
    .then((logs) => {
      res.send(logs);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving logs.",
      });
    });
};
