const express = require('express');
const router = express.Router();
const charityController = require("../controller/charityController");
const {authentication, isCharityAuthorization} = require('../middleware/auth');


// Charity registration and profile updates
router.post("/register", charityController.registerCharity);
router.post('/login', charityController.login);
router.put("/update", authentication, isCharityAuthorization, charityController.updateCharity);
router.get('/get', authentication, charityController.searchCharities);

// Project creation and update
router.post("/add-project", authentication, isCharityAuthorization, charityController.addProject);
router.put("/update-project/:id", authentication, isCharityAuthorization, charityController.updateProject);
router.get('/projects', authentication, charityController.getAllProjects);



module.exports = router;
