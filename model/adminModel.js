const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Admin = sequelize.define("admins", {
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
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    }
});

module.exports = Admin;