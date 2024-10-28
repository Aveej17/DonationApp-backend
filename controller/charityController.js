const Charity = require("../model/charityModel");
const Project = require("../model/projectModel");
const AdminApproval = require("../model/adminApprovalModel");
const { hashPassword, comparePassword } = require('../middleware/bcrypt');
const UserException = require("../exception/UserException");
const { generateToken } = require('../middleware/jwt');
const { sendCredentialsByEmail } = require('./mailController');
const { generateRandomPassword } = require('../util/generateRandomPassword');


exports.registerCharity = async (req, res, next) => {
    try {
        const { name, description, email, password, mission, goals } = req.body;
        if(!name || !email || !password || !mission || !goals){
            throw new Error("Missing params");
        }
        const hash = await hashPassword(password);
        const charity = await Charity.create({ name, description, email, password:hash, mission, goals});
        await AdminApproval.create({ charityId: charity.id });
        res.status(201).json({ message: "Charity registered and pending admin approval.", charity });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ParameterMissingException("Email and password are required");
        }

        const charity = await Charity.findOne({ where: { email } });
        if (!charity) {
            throw new UserException("Charity not found");
        }
        if(!charity.isApproved){
            throw new UserException("Charity is not approved");
        }
        const isPasswordValid = await comparePassword(password, charity.password);
        if (!isPasswordValid) {
            throw new UserException("Invalid credentials");
        }

        // Generate a token for the logged-in charity
        const token = await generateToken({ id: charity.id , role:"charity"});

        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        next(err);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        if (!req.body.email) {
            throw new ParameterMissingException("Email is required");
        }

        const charity = await Charity.findOne({ where: { email: req.body.email } });
        if (!charity) {
            throw new UserException("Charity not found");
        }

        const newPassword = generateRandomPassword();
        charity.password = await hashPassword(newPassword);
        await charity.save();
        await sendCredentialsByEmail(charity.email, newPassword);

        res.status(200).json({ message: "New password sent to your email", success: true });
    } catch (err) {
        next(err);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        if (!req.body.oldPassword || !req.body.newPassword) {
            throw new ParameterMissingException("Email and new password are required");
        }
        if(req.body.oldPassword === req.body.newPassword){
            throw new UserException("Old and new Password should be different");
        }
        const charity = await Charity.findByPk(req.authId);
        if (!charity) {
            throw new UserException("charity not found");
        }

        charity.password = await hashPassword(req.body.newPassword);
        await charity.save();

        res.status(200).json({ message: "Password updated successfully", success: true });
    } catch (err) {
        next(err);
    }
};


exports.updateCharity = async (req, res, next) => {
    try {
        const id = req.authId;
        console.log(id);
        const { name, description, email, mission, goals, category, location } = req.body;
        const charity = await Charity.findByPk(id);
        if (!charity) return res.status(404).json({ message: "Charity not found" });

        // Build an object with only the fields that are provided in req.body
        const updatedFields = {};
        if (name !== undefined) updatedFields.name = name;
        if (description !== undefined) updatedFields.description = description;
        if (email !== undefined) updatedFields.email = email;
        if (mission !== undefined) updatedFields.mission = mission;
        if (goals !== undefined) updatedFields.goals = goals;
        if (category !== undefined) updatedFields.category = category;
        if (location !== undefined) updatedFields.location = location;

        await charity.update(updatedFields);
        res.status(200).json({ message: "Charity updated successfully", charity });
    } catch (error) {
        next(error);
    }
};


exports.addProject = async (req, res, next) => {
    try {
        const { name, description, donationGoal, amountRaised } = req.body;
        const charityId = req.authId;
        const charity = await Charity.findByPk(charityId);
        if (!charity || !charity.isApproved) {
            return res.status(400).json({ message: "Charity must be approved before adding projects." });
        }

        const project = await Project.create({name: name,
            description: description,
            donationGoal: donationGoal,
            amountRaised: amountRaised,
            charityId: charityId });
        res.status(201).json({ message: "Project added successfully", project });
    } catch (error) {
        next(error);
    }
};

exports.updateProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, donationGoal, amountRaised } = req.body;
        
        const project = await Project.findByPk(id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        // Create an object with only the fields that need to be updated
        const updates = {};
        if (name !== undefined) updates.name = name;
        if (description !== undefined) updates.description = description;
        if (donationGoal !== undefined) updates.donationGoal = donationGoal;
        if (amountRaised !== undefined) updates.amountRaised = amountRaised;

        // Update the project only with the fields that have been changed
        await project.update(updates);
        
        res.status(200).json({ message: "Project updated successfully", project });
    } catch (error) {
        next(error);
    }
};


exports.getAllProjects = async (req, res, next) => {
    try {
        const charityId = req.query.charityId; 
        console.log(charityId);
        

        // Fetch all projects associated with the authenticated charity
        const projects = await Project.findAll({ where: { charityId } });

        if (!projects.length) {
            return res.status(404).json({ message: "No projects found for this charity." });
        }

        res.status(200).json({ message: "Projects retrieved successfully", projects });
    } catch (error) {
        next(error);
    }
};

exports.searchCharities = async (req, res, next) => {
    try {
        const { category, location } = req.query; // Extracting query parameters

        const whereClause = { isApproved: true }; // Only fetch approved charities

        // Add category filter if provided
        if (category) {
            whereClause.category = category;
        }

        // Add location filter if provided
        if (location) {
            whereClause.location = location;
        }

        // Fetch the charities based on the where clause
        const charities = await Charity.findAll({ where: whereClause });

        res.status(200).json({ charities });
    } catch (error) {
        next(error);
    }
};