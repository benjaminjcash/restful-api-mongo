const { accessSecret } = require('../jwt-config');
const { verifyToken } = require('../utils/jwt-helpers');
const isTest = process.env.__TEST__;

module.exports = (req, res, next) => {
    if(isTest) { // if running tests, set test user id and skip authentication
        req.auth = {
            id: '5fb5d78d8ca5e50b293a0b6c'
        }
        return next();
    }
    
    const authHeader = req.headers['auth-token'] || req.headers['authorization'];
    const accessToken = authHeader.split(' ')[1];
    if(!accessToken) return res.status(401).send({
        success: false,
        error: 'no token provided'
    });
    try {
        const auth = verifyToken(accessToken, accessSecret, req, res);
        req.auth = auth;
        next();
    }
    catch(err) {
        res.status(403).send({
            success: false,
            message: 'invalid token'
        });
    }
}