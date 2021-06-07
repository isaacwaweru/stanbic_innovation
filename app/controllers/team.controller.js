const Team = require("../models/team.model.js");
const User = require("../models/user.model.js");
const sendEmail = require("../util/email.js");
const jwt = require("../util/jwt.js");
const AppError = require("../util/AppError.js");
const catchAsync = require("../util/catchAsync.js");
const bcrypt = require("bcrypt");

//Create team
exports.createTeam = (req, res, next) => {
      const team = new Team({
        teamName: req.body.teamName,
        members:req.body.members
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

  //Team add member
  exports.addMember = async (req, res) => {
    console.log(req.params.id)
    const team = await Team.findOne({_id: req.params.id});
    team.members.push(req.body)
    const response = await team.save().then(() => {
      res.status(201).json({
        message: "Member added successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
  }

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

//Team leads without teams
exports.hasNoTeam = (req, res) => {
  User.find({role: 'Team member', hasTeam: false})
    .then((teams) => {
      res.send(teams);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving teams.",
      });
    });
}