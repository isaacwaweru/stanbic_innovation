const Team = require("../models/team.model.js");
const User = require("../models/user.model.js");
const Innovation = require("../models/innovation.model.js");
const sendEmail = require("../util/email.js");
const jwt = require("../util/jwt.js");
const AppError = require("../util/AppError.js");
const catchAsync = require("../util/catchAsync.js");
const bcrypt = require("bcrypt");
const { stubTrue } = require("lodash");

//Submit innovation
exports.submitInnovation = (req, res, next) => {
  const innovation = new Innovation({
    innovation: req.body.innovation,
    status: req.body.status,
    team: req.body.team,
    Questions: req.body.questions,
  });
  innovation
    .save()
    .then(() => {
      res.status(201).json({
        message: "Innovation submitted successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

// Retrieve and return all innovations from the database.
exports.findAllInnovations = (req, res) => {
  Innovation.find()
    .then((innovation) => {
      res.send(innovation);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving teams.",
      });
    });
};
