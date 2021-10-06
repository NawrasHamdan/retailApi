const jwt = require('jsonwebtoken');
const createError = require('http-errors');

//generate access token

function signAccessToken(userId) {
    return new Promise((resolve, reject) => {
        jwt.sign({ userId: userId }, process.env.ACCESSTOKEN, { expiresIn: '1m', issuer: "revpos.com", audience: userId.toString() }, (error, token) => {
            if (error) {
                console.log(error);
                return reject(createError.InternalServerError('An error has occured, Please try again later'));
            }
            resolve(token);
        });
    });
};


////generate refresh token 

function singRefreshToken(userId) {
    return new Promise((resolve, reject) => {
        jwt.sign({ userId: userId }, process.env.REFRESHTOKEN, { expiresIn: '1y', issuer: "revpos.com", audience: userId.toString() }, (error, token) => {
            if (error) {
                console.log(error);
                return reject(createError.InternalServerError('An error has occured, Please try again later'));
            }
            resolve(token);
        });
    });
};


//Verfiy access token

function VerfiyAcccessToken(req, res, next) {
    //no token is sent just exit 
    if (!req.headers['authorization']) return next(createError.Unauthorized());
    //get the token from the request header (split it since it's send via token bearer)
    const token = req.headers['authorization'].split(" ")[1];
    jwt.verify(token, process.env.ACCESSTOKEN, (err, decoded) => {
        //Extermly important to send the error as token exipred so the frontend would send the refresh
        //token next time when making the request using the /refresh-token path
        if (err) {
            switch (err.name) {
                case "TokenExpiredError":
                    return next(createError.Unauthorized(err.message));
                case "JsonWebTokenError":
                    console.log(err.message);
                    return next(createError.Unauthorized());
                default:
                    return next(createError.Unauthorized());
            };
        };
        //return the payload (userid) to our routes 
        req.payload = decoded;
        next();
    });
};


//verify the refresh token
function verfiyRefreshToken(refreshToken) {

    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESHTOKEN, (err, decoded) => {
            if (err) return reject(createError.Unauthorized());
            const userId = decoded.aud;
            resolve(userId);
        });
    });
};


module.exports = {
    signAccessToken,
    singRefreshToken,
    verfiyRefreshToken,
    VerfiyAcccessToken
}