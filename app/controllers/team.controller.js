const Team = require("../models/team.model.js");
const User = require("../models/user.model.js");
const sendEmail = require("../util/email.js");
const jwt = require("../util/jwt.js");
const AppError = require("../util/AppError.js");
const catchAsync = require("../util/catchAsync.js");
const bcrypt = require("bcrypt");
const { stubTrue } = require("lodash");

//Create team
exports.createTeam = (req, res, next) => {
  const team = new Team({
    teamName: req.body.teamName,
    members: req.body.members,
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

//Update team names
exports.updateTeam = (req, res) => {
  const id = req.params.id;
  Team.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Team with id=${id}. Maybe Team was not found!`,
        });
      } else res.send({ message: "Team was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Team with id=" + id,
      });
    });
};

//Fetch team by userId
exports.findByUserId = (req, res) => {
  const id = req.params.id;
  Team.find({ "members.user_id": id })
    .then(function (team) {
      return res.status(200).json(team);
    })
    .catch(function (err) {
      return handleError(res, err);
    });
};

//Team add member
exports.addMember = async (req, res) => {
  const team = await Team.findOne({ _id: req.params.id });
  team.members.push(req.body);
  const response = await team
    .save()
    .then(() => {
      res.status(200).json({
        message: "Member added successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

//Remove member
exports.removeMember = (req, res) => {
  const id = req.params.memberid;
  Team.find({ "members.user_id": id }).then(function (team) {
    const mems = team[0].members.filter(function (el) {
      return el.user_id === req.params.memberid;
    });
    const deleteID = mems[0]._id;
    Team.findById(req.params.id, function (err, member) {
      if (err) {
        return console.log(err);
      }
      member.members.pull(deleteID);
      member.save(function (err, editedMembers) {
        if (err) {
          return console.log(err);
        }
        res.status(200).json({
          status: "success",
          message: "Member deleted successfully!",
        });
      });
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

//Team leads without teams
exports.hasNoTeam = (req, res) => {
  User.find({ role: "Team member", hasTeam: false })
    .then((teams) => {
      res.send(teams);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving teams.",
      });
    });
};

//Search team memmbers with no team
exports.searchHasNoTeam = (req, res) => {
  User.find({
    role: "Team member",
    hasTeam: false,
    $or: [
      { firstname: { $regex: req.body.value, $options: "i" } },
      { lastname: { $regex: req.body.value, $options: "i" } },
      { location: { $regex: req.body.value, $options: "i" } },
      { email: { $regex: req.body.value, $options: "i" } },
    ],
  })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving teams.",
      });
    });
};
