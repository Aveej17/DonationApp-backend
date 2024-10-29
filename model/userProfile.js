const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const User = require('./userModel');

const UserProfile = sequelize.define("userProfile", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    city: {
        type: Sequelize.STRING(100),
        allowNull: true,
    },
    postalCode: {
        type: Sequelize.STRING(10),
        allowNull: true,
    },
    country: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: true,
    },
    profilePicture: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

UserProfile.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
User.hasOne(UserProfile, { foreignKey: 'userId', as: 'profile', onDelete: 'CASCADE' });

module.exports = UserProfile;
