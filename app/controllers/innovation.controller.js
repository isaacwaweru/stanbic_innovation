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
    title: req.body.title,
    category: req.body.category,
    problem: req.body.problem,
    proposedSolution: req.body.proposedSolution,
    status: req.body.status,
    teamId: req.body.teamId,
    judges: req.body.judges
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

//Fetch innovation by userId
exports.findByTeamId = (req, res) => {
  const id = req.params.id;
  Innovation.find({ "teamId": id})
.then(function(team) {
  return res.status(200).json(team);
})
.catch(function(err) {
  return handleError(res, err);
});
}

//Update innovation
exports.updateInnovation = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.innovationId;
  Innovation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Innovation with id=${id}. Maybe Innovation was not found!`
        });
      } else res.send({ message: "Innovation was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Innovation with id=" + id
      });
    });
}

//Fetch complete innovation
exports.completeInnovation = (req, res) => {
  const id = req.params.id;
  Innovation.find({ "status": id})
.then(function(team) {
  return res.status(200).json(team);
})
.catch(function(err) {
  return handleError(res, err);
});
}

//Submit innovation
exports.submitInnovationQuestion = async (req, res) => {
  const innovation = await Innovation.findOne({ _id: req.params.id });
  innovation.Questions.push(req.body);
  const response = await innovation
    .save()
    .then(() => {
      res.status(200).json({
        message: "Innovation submitted successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

//Innovations reviews
exports.innovationsReview = async (req, res) => {
  Innovation.findById(req.params.id, function (err, result) {
    if (!err) {
      if (!result) {
        res.sendStatus(404).send("Innovation was not found").end();
      } else {
        console.log(result.Questions[0].Judges);
        result.Questions[0].Judges.push(req.body);
        result.markModified("innovations");
        result.save(function (saveerr, saveresult) {
          if (!saveerr) {
            res.status(200).send(saveresult);
          } else {
            res.status(400).send(saveerr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
};