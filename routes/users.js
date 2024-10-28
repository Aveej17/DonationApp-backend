const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const {authentication} = require('../middleware/auth');
const multer = require('multer');
const upload = multer();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.post('/resetPassword', userController.resetPassword);
router.put('/changePassword', authentication, userController.changePassword);
router.put('/profile', authentication, upload.single('profilePicture'), userController.createOrUpdateProfile);
router.get('/profile', authentication, userController.getProfile);

module.exports = router;
