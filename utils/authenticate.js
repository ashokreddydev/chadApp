var jwt = require("jwt-simple");
var config = require("../config/config");
var responseHandler = require("./responseHandler");

//authentication
module.exports = function (req, res, next) {
    if (req.url == "/api/login") {
        next();
    }
    else{
        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            if(decoded){
                req.body.details=decoded;
                next();
            }
            else{
                responseHandler(req,res,null,"Unauthenticated Access");
            }
        }
        else{
            responseHandler(req,res,null,"Unauthenticated Access");
        }
    }
    
}
var getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};