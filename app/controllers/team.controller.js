const Team = require("../models/team.model.js");
const sendEmail = require("../util/email.js");
const jwt = require("../util/jwt.js");
const AppError = require("../util/AppError.js");
const catchAsync = require("../util/catchAsync.js");
const bcrypt = require("bcrypt");

//Create team
exports.createTeam = (req, res, next) => {
      const team = new Team({
        teamName: req.body.teamName,
        team_lead_id: req.body.team_lead_id,

      });
      team
        .save()
        .then(() => {
          res.status(201).json({
            message: "Team created successfully!",
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
  };

  // Retrieve and return all teams from the database.
exports.findAll = (req, res) => {
  Team.find()
    .then((teams) => {
      res.send(teams);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving teams.",
      });
    });
};