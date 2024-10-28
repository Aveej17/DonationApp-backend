const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require('../model/userModel');
const Charity = require('../model/charityModel');
const {sendEmailForDonation} = require('./mailController');

require('dotenv').config();

const Donation = require('../model/donationModel');
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});


exports.createDonationOrder = async (req, res, next) => {
    try {
        const { amount, currency = "INR", charityId } = req.body;

        const userId = req.authId; // Assumes `userId` is available from authentication middleware

        // Create a Razorpay order
        const options = {
            amount: amount * 100, // Convert amount to smallest currency unit
            currency,
            receipt: `receipt_${userId}_${Date.now()}`,
            payment_capture: 1, // Automatically capture payment
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            key_id:razorpay.key_id,
            orderId: order.id,
            amount: options.amount,
            currency: options.currency,
            userId,
            charityId,
        });
    } catch (error) {
        next(error);
    }
};




exports.verifyDonation = async (req, res, next) => {
    try {
        const { paymentId, orderId, signature } = req.body;

        // Create the signature as Razorpay expects it
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(`${orderId}|${paymentId}`)
            .digest("hex");

        if (expectedSignature !== signature) {
            return res.status(400).json({ message: "Invalid payment signature" });
        }

        // If signature is valid, store the donation details in the database
        await Donation.create({
            userId: req.authId, // From authentication middleware
            charityId: req.body.charityId,
            amount: req.body.amount,
            paymentId,
            status: "confirmed",
        });
        const user = await User.findByPk(req.authId);
        const charity = await Charity.findByPk(req.body.charityId);
        const details = {
            amount : req.body.amount,
            charityName: charity.name,
            userName:user.name
        }
        await sendEmailForDonation(user.email, details);
        res.status(200).json({ message: "Donation verified and recorded successfully" });
    } catch (error) {
        next(error);
    }
};

exports.getDonationHistory = async(req, res, next)=>{
    
    try{
        const donations = await Donation.findAll({while:{userId:req.authId}});
        res.status(200).json({success:true, donations});
    }
    catch(err){
        next(err);
    }
}
