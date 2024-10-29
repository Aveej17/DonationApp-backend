const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../model/userModel");
const Charity = require("../model/charityModel");
const { sendEmailForDonation } = require("./mailController");
const PDFDocument = require("pdfkit");
const { PassThrough } = require("stream");
const s3 = require("./awsS3Controller.js");

require("dotenv").config();

const Donation = require("../model/donationModel");
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
      key_id: razorpay.key_id,
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
      amount: req.body.amount,
      charityName: charity.name,
      userName: user.name,
    };
    await sendEmailForDonation(user.email, details);
    res
      .status(200)
      .json({ message: "Donation verified and recorded successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getDonationHistory = async (req, res, next) => {
  try {
    const donations = await Donation.findAll({ while: { userId: req.authId } });
    res.status(200).json({ success: true, donations });
  } catch (err) {
    next(err);
  }
};

exports.downloadReceipt = async (req, res, next) => {
  try {
    const { donationId } = req.params;
    // console.log("going to fetch donation");

    // Fetch donation details from the database
    const donation = await Donation.findOne({
        where: { id: donationId, userId: req.authId },
        include: [
            { model: Charity, as: "charity" }, // Include the Charity model
            { model: User, as: "user" }        // Include the User model
        ],
    });
    
    console.log(donation);

    if (!donation) {
      return res
        .status(404)
        .json({ success: false, message: "Donation not found" });
    }

    // Generate the PDF in memory using a PassThrough stream
    const doc = new PDFDocument();
    const pdfStream = new PassThrough();
    doc.pipe(pdfStream);

    // Add content to the PDF
    doc.fontSize(20).text("Donation Receipt", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Donation ID: ${donation.id}`);
    doc.text(`Amount: ${donation.amount}`);
    doc.text(`Donor: ${donation.user.name}`);
    doc.text(`Charity: ${donation.charity?.name}`); // Optional chaining to handle undefined
    doc.text(`Date: ${donation.createdAt.toDateString()}`);
    doc.text(`Thank you for your generous donation!`);
    doc.end();

    // Upload to S3
    const fileUrl = await s3.downloadReceipt(donationId, pdfStream);
    // console.log(fileUrl);
    res.status(201).send({ success: true, fileUrl });
  } catch (err) {
    next(err);
  }
};
