const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../util/database");
const User = require('./userModel');
const Charity = require('./charityModel');

const Donation = sequelize.define("donation", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  charityId: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  paymentId: { type: DataTypes.STRING, unique: true, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
});


Donation.belongsTo(User, { foreignKey: 'userId' });
Donation.belongsTo(Charity, { foreignKey: 'charityId' });


module.exports = Donation;