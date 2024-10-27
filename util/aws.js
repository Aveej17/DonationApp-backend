const AWS = require('aws-sdk');
const express = require('express');
const router = express.Router();
require("dotenv").config();

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
});

const s3 = new AWS.S3();

// // Endpoint to generate a pre-signed URL for uploading profile picture
// router.get('/api/v1/user/profile-picture-url', (req, res) => {
//     const params = {
//         Bucket: 'YOUR_BUCKET_NAME',
//         Key: `profile-pictures/${req.user.id}.png`, // User-specific path
//         Expires: 60, // URL expiration time in seconds
//         ContentType: 'image/png' // Specify the expected content type
//     };

//     s3.getSignedUrl('putObject', params, (err, url) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json({ url }); // Send the pre-signed URL back to the client
//     });
// });

module.exports = s3;
