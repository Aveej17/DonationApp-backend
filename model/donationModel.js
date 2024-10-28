const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../util/database");

const Donation = sequelize.define("donation", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  charityId: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  paymentId: { type: DataTypes.STRING, unique: true, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
});

module.exports = Donation;
