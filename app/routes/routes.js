module.exports = (app) => {
    const express = require("express");
    const auth = require("../middleware/auth.js");
    const users = require("../controllers/user.controller.js");
  
    // Sign up a new user
    app.post("/register", users.signup);
  
    // login
    app.post("/login", users.login);
  
    // Retrieve all users
    app.get("/users", auth, users.findAll);
  
    // Retrieve a single user with usersId
    app.get("/users/:userId", auth, users.findOne);

    // reset password
    app.post("/reset", users.login);
  };
  