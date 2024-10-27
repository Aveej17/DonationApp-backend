const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const {authentication} = require('../middleware/auth');

/* GET users listing. */
router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.post('/resetPassword', userController.resetPassword);
router.put('/changePassword', authentication, userController.changePassword);
router.put('/profile', authentication, userController.createOrUpdateProfile);
router.get('/profile', authentication, userController.getProfile);
router.post('/profile-picture-url', authentication, userController.getUrl);
module.exports = router;
