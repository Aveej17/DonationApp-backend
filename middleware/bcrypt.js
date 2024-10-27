const bcrypt = require('bcrypt');

exports.hashPassword = async (password) =>{
    return bcrypt.hash(password, 10);
}

exports.comparePassword = async (givenPassword, originalPassword)=>{
    return bcrypt.compare(givenPassword, originalPassword);
}