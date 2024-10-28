const {parseToken , verifyToken} = require('./jwt');
const UserException = require("../exception/UserException");
const PermissionDeniedException = require("../exception/PermissionDeniedException");

exports.authentication = async (req, res, next) =>{
    try {
        const token = parseToken(req);
        if (!token) {
            throw new UserException('No token provided, please login');
        }
        const decodedUser = verifyToken(token);
        if (!decodedUser) {
            throw new UserException('Invalid/Expired token, please login again');
        }
        req.authId = decodedUser.id;
        req.role = decodedUser.role;
        next();
    }
    catch(err){
        next(err);
    }
}

// exports.authorization = (req, res, next) =>{
//     try {
//         if(req.role){
//             next();
//         }
//         else{
//             throw new PermissionDeniedException("Not authorized for this");
//         }
//     }
//     catch(err){
//         next(err);
//     }
// }

exports.isAdminAuthorization = (req, res, next) =>{
    try {
        if(req.role === "admin"){
            next();
        }
        else{
            throw new PermissionDeniedException("Not authorized for this");
        }
    }
    catch(err){
        next(err);
    }
}

exports.isCharityAuthorization = (req, res, next) =>{
    try {
        if(req.role === "charity"){
            next();
        }
        else{
            throw new PermissionDeniedException("Not authorized for this");
        }
    }
    catch(err){
        next(err);
    }
}