const { Model, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

class Charity extends Model {}

Charity.init({
     name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    mission: { type: DataTypes.TEXT, allowNull: false },
    goals: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING }, // New field for category
    location: { type: DataTypes.STRING }, // New field for location
    isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { sequelize, modelName: "charity" });

module.exports = Charity;

