const { Model, DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Charity = require("./charityModel");

class AdminApproval extends Model {}

AdminApproval.init({
    charityId: { type: DataTypes.INTEGER, references: { model: Charity, key: "id" } },
    status: { type: DataTypes.ENUM("pending", "approved", "rejected"), defaultValue: "pending" },
    comments: { type: DataTypes.TEXT },
}, { sequelize, modelName: "adminApproval" });

AdminApproval.belongsTo(Charity, { foreignKey: "charityId" });

module.exports = AdminApproval;
