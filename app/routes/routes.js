module.exports = (app) => {
    const auth = require("../middleware/auth.js");
    const users = require("../controllers/user.controller.js");
    const teams = require("../controllers/team.controller.js");
  
    // User sign up
    app.post("/register", users.signup);

    //User account activation
    app.put("/activate", users.accountActivation);

    // user login
    app.post("/login", users.login);
  
    // Retrieve all users
    app.get("/users", auth, users.findAll);
  
    // Retrieve a single user with usersId
    app.get("/users/:userId", auth, users.findOne);

    // User forgot password
    app.post('/forgotPassword', users.forgotPassword);

    //User reset password
    app.patch('/resetPassword', users.resetPassword);

    // Team create 
    app.post("/team", auth, teams.createTeam);

    // Teams 
    app.get("/teams", auth, teams.findAll);

    //Get team leads where hasTeam is false
    app.get("/teams/noTeam", auth, teams.hasNoTeam);

    // Team create 
    app.post("/teams/member/:id", auth, teams.addMember);
  };
  