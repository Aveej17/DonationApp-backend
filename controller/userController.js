const User = require('../model/userModel');
const ParameterMissingException = require("../exception/ParameterMissingException");
const { hashPassword, comparePassword } = require('../middleware/bcrypt');
const UserException = require("../exception/UserException");
const {generateToken} = require('../middleware/jwt');
const {sendCredentialsByEmail} = require('./mailController');
const UserProfile = require("../model/userProfile");

const s3 = require('../util/aws');

exports.signUp = async (req, res, next) => {
    try {
        console.log(req.body);
        if (!req.body.name || !req.body.email || !req.body.password)
        {
            throw new ParameterMissingException("One or more parameters are missing");
        }

        const existingUser = await User.findOne({where:{email:req.body.email}});
        if(existingUser){
            throw new UserException("Another account is already present please try login")
        }
        const hash = await hashPassword(req.body.password);
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: hash
        }

        await User.create(user);


        res.status(201).json({message:"User Account Created", success:true});
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) =>{
    try {
        if (!req.body.email || ! req.body.password)
        {
            throw new ParameterMissingException("One or more parameters are missing");
        }
        const user = await User.findOne({where:{email:req.body.email}})
        if(!user){
            throw new UserException("Account not found kindly create an account");
        }
        if(!await comparePassword(req.body.password, user.password)){
            throw new UserException("Kindly verify the credentials");
        }
        const token = await generateToken({id: user.id});

        res.status(200).json({token:token, success:true});

    }
    catch(err){
        next(err)
    }
}

exports.changePassword = async (req, res, next)=>{
    try {
        if (!req.body.oldPassword || !req.body.newPassword)
        {
            throw new ParameterMissingException("One or more parameters are missing");
        }
        if(req.body.oldPassword === req.body.newPassword){
            throw new UserException("Old and new Password should be different");
        }

        const user = await User.findByPk(req.authId);
        if (!user) {
            throw new UserException("User Not Found")
        }
        user.password = await hashPassword(req.body.newPassword);
        await user.save();

        res.status(200).json({message:"PasswordChanged Successfully", success:true});
    }
    catch (err){
        next(err)
    }
}

exports.resetPassword = async(req, res, next) =>{
    try {
        if (!req.body.email)
        {
            throw new ParameterMissingException("One or more parameters are missing");
        }
        const user = await User.findOne({where:{email:req.body.email}});
        console.log(user);
        if(!user){
            throw new UserException("User Not Found");
        }
        const password = generateRandomPassword();

        user.password = await hashPassword(password);
        await user.save();
        await sendCredentialsByEmail(user.email, password);
        res.status(200).json({message:"updated Password sent to your mail kindly check", success:true});
    }
    catch (err){
        next(err);
    }
}

exports.createOrUpdateProfile = async (req, res, next) => {
    try {
        const { address, city, postalCode, country, dateOfBirth, gender, profilePicture} = req.body;

        const userId = req.authId; 
        let profile = await UserProfile.findOne({ where: { userId } });

        if (profile) {
            // Update existing profile
            await profile.update({
                address,
                city,
                postalCode,
                country,
                dateOfBirth,
                gender,
                profilePicture,
            });
            res.status(200).json({ message: "Profile updated successfully", success: true });
        } else {
            // Create a new profile
            profile = await UserProfile.create({
                userId,
                address,
                city,
                postalCode,
                country,
                dateOfBirth,
                gender,
                profilePicture,
            });
            res.status(201).json({ message: "Profile created successfully", success: true });
        }
    } catch (err) {
        next(err);
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        const userId = req.authId;

        const profile = await UserProfile.findOne({ where: { userId } });
        if (!profile) {
            return null;
        }
        res.status(200).json({ profile, success: true });
    } catch (err) {
        next(err);
    }
};


exports.getUrl = async (req, res, next) => {
    // console.log(req.authId);
    const  userId = req.authId; 
    const fileName = `${userId}.png`; // Or .jpg depending on your requirements
    console.log(fileName);
    
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `profile-pictures/${fileName}`,
        Expires: 60, // URL expires in 60 seconds
        ContentType: 'image/png' // Change this to image/jpeg if needed
    };

    try {
        const url = await s3.getSignedUrlPromise('putObject', params);
        console.log("url "+url);
        res.json({ url }); // Return the pre-signed URL to the client
    } catch (err) {
        console.error("Error generating pre-signed URL", err);
        res.status(500).send("Error generating URL");
    }
    
};


// exports.getUrl = async (req, res, next) =>{
//     try{
//         console.log("UrlGets called");
//         const mimeType = fileExtension === 'jpg' ? 'image/jpeg' : 'image/png';
//     const params = {
//         Bucket: process.env.BUCKET_NAME,
//         Key: `profile-pictures/${req.authId}.${fileExtension}`, // User-specific path
//         Expires: 60, // URL expiration time in seconds
//         ContentType: 'image/png' // Specify the expected content type
//     };

//     s3.getSignedUrl('putObject', params, (err, url) => {
//         if (err) {
//             console.log(err);
            
//             return res.status(500).send(err);
//         }
//         res.json({ url }); // Send the pre-signed URL back to the client
//     });}
//     catch(err){
//         throw new Error("Something went wrong");
//     }
// }
