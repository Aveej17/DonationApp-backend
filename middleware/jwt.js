const jwt = require('jsonwebtoken');
const UserException = require("../exception/UserException");

exports.generateToken = async (req)=>{
    if(req.role) {
        return jwt.sign({id: req.id, role: req.role}, process.env.JWT_SECRET, {expiresIn: "1d"})
    }
    else{
        return jwt.sign({id: req.id}, process.env.JWT_SECRET, {expiresIn: "1d"})
    }
}

exports.parseToken = (req) =>{
    const authHeader = req.headers['authorization']; // or req.get('Authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }
}

exports.verifyToken = (token) =>{
    return jwt.verify(token,  process.env.JWT_SECRET, (err, decoded) =>{
        if(err){
            throw new UserException("Token expired/invalid");
        }else{
            return decoded;
        }
    });
}