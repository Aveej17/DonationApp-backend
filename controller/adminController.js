const Charity = require("../model/charityModel");
const AdminApproval = require("../model/adminApprovalModel");
const Admin = require('../model/adminModel');
const ParameterMissingException = require("../exception/ParameterMissingException");
const { hashPassword, comparePassword } = require('../middleware/bcrypt');
const UserException = require("../exception/UserException");
const { generateToken } = require('../middleware/jwt');
const { sendCredentialsByEmail, sendCharityApprovalMail, sendCharityRejectionMail } = require('./mailController');
const { generateRandomPassword } = require('../util/generateRandomPassword');

exports.createAdmin = async (req, res, next) => {
    try {
        if (!req.body.name || !req.body.email) {
            throw new ParameterMissingException("One or more parameters are missing");
        }

        const existingAdmin = await Admin.findOne({ where: { email: req.body.email } });
        if (existingAdmin) {
            throw new UserException("An admin with this email already exists");
        }
        const password = generateRandomPassword();
        const hash = await hashPassword(password);
        const admin = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
        };

        await Admin.create(admin);
        await sendCredentialsByEmail(admin.email, password);
        res.status(200).json({message: "credentials are sent to your employee mail kindly check", success: true});
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            throw new ParameterMissingException("Email and password are required");
        }

        const admin = await Admin.findOne({ where: { email: req.body.email } });
        if (!admin) {
            throw new UserException("Admin not found");
        }

        
        const isPasswordValid = await comparePassword(req.body.password, admin.password);
        if (!isPasswordValid) {
            throw new UserException("Invalid credentials");
        }

        
        const token = await generateToken({id:admin.id, role:"admin"});

        res.status(200).json({
            message: "Login successful",
            token: token,
            // adminId: admin.id,
            success: true
        });
    } catch (err) {
        next(err);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        if (!req.body.email) {
            throw new ParameterMissingException("Email is required");
        }

        const admin = await Admin.findOne({ where: { email: req.body.email } });
        if (!admin) {
            throw new UserException("Admin not found");
        }

        const newPassword = generateRandomPassword();
        admin.password = await hashPassword(newPassword);
        await admin.save();
        await sendCredentialsByEmail(admin.email, newPassword);

        res.status(200).json({ message: "New password sent to your email", success: true });
    } catch (err) {
        next(err);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.newPassword) {
            throw new ParameterMissingException("Email and new password are required");
        }

        const admin = await Admin.findOne({ where: { email: req.body.email } });
        if (!admin) {
            throw new UserException("Admin not found");
        }

        admin.password = await hashPassword(req.body.newPassword);
        await admin.save();

        res.status(200).json({ message: "Password updated successfully", success: true });
    } catch (err) {
        next(err);
    }
};

exports.approvalRequests = async (req, res, next) => {
    try {
        const approval = await AdminApproval.findAll({where:{status:"pending"}});
        res.status(200).json({ message: "Charities waiting for approval", approval });
    } catch (error) {
        next(error);
    }
};

exports.approveCharity = async (req, res, next) => {
    try {
        const { charityId } = req.params;
        const { status } = req.body; // Expecting status to be either "approved" or "rejected"
        
        const approval = await AdminApproval.findOne({ where: { charityId } });
        if (!approval) return res.status(404).json({ message: "Approval record not found" });

        // Update approval status
        await approval.update({ status });

        const charity = await Charity.findByPk(charityId);
        if (!charity) return res.status(404).json({ message: "Charity not found" });

        // Update charity approval based on the status
        if (status === "approved") {
            await charity.update({ isApproved: true });
            await sendCharityApprovalMail(charity.email);
            res.status(200).json({ message: "Charity approved successfully", charity });
        } else if (status === "rejected") {
            await charity.update({ isApproved: false });
            await sendCharityRejectionMail(charity.email);
            res.status(200).json({ message: "Charity rejected successfully", charity });
        } else {
            return res.status(400).json({ message: "Invalid status. Use 'approved' or 'rejected'." });
        }
    } catch (error) {
        next(error);
    }
};
