const express = require('express');
const adminController = require('../controller/adminController');
const {authentication, isAdminAuthorization} = require('../middleware/auth'); 

const router = express.Router();

// Admin Routes
router.post('/login', adminController.login);
router.post('/create', authentication, isAdminAuthorization, adminController.createAdmin); 
router.post('/forgot-password',  adminController.forgotPassword);
router.post('/reset-password', authentication, isAdminAuthorization, adminController.resetPassword);
router.get('/approve-charity-requests', authentication, isAdminAuthorization, adminController.approvalRequests);
router.post('/approve-charity/:charityId', authentication, isAdminAuthorization, adminController.approveCharity);

module.exports = router;
