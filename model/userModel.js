const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define("users", {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING(45),
        allowNull: false,
    },
    email:{
        type:Sequelize.STRING(45),
        allowNull:false,
        unique:true,
    },
    phoneNo:{
        type:Sequelize.STRING(20),
        allowNull:true,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    }
});

module.exports = User;