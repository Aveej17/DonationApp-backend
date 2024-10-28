const express = require('express');
const router = express.Router();
const donationController = require('../controller/donationController');
const {authentication} = require('../middleware/auth');

router.post('/create', authentication, donationController.createDonationOrder);
router.post('/verify', authentication, donationController.verifyDonation);
router.get('/history', authentication, donationController.getDonationHistory);
router.get('/downloadReceipts/:donationId', authentication, donationController.downloadReceipt);

module.exports = router;