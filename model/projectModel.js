const { Model, DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Charity = require("./charityModel");

class Project extends Model {}

Project.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // Enable auto-increment
        primaryKey: true,    // Set this field as the primary key
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    donationGoal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    amountRaised: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    charityId: { type: DataTypes.INTEGER, references: { model: Charity, key: "id" } },
}, { sequelize, modelName: "project" });

Project.belongsTo(Charity, { foreignKey: "charityId" });
Charity.hasMany(Project, { foreignKey: "charityId" });

module.exports = Project;
