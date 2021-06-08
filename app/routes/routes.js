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

    //User update user hasTeam
    app.patch('/updateHasTeam/:id', auth, users.updateHasTeam);

    // Team create 
    app.post("/team", auth, teams.createTeam);

    // Teams 
    app.get("/team", auth, teams.findAll);

    //Get team leads where hasTeam is false
    app.get("/teams/noTeam", auth, teams.hasNoTeam);

    // Team add members
    app.post("/team/member/:id", auth, teams.addMember);

    //Update team name
    app.put("/team/:id", auth, teams.updateTeam);

    //Fetch team by userId
    app.get("/team/user/:id", auth, teams.findByUserId);

    //Remove member from a team
    app.delete("/team/:id/member/:memberid/deleteref", auth, teams.removeMember);

    //Search team members without hasTeam
    app.post("/team/searchTeamMembers", auth, teams.searchHasNoTeam);

    //Update team lead
    app.patch("/team/:leadid/member/:memberid/role", auth, users.userRole);
  };
  