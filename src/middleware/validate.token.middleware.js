const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt-config');
const isTest = process.env.__TEST__;

exports.validateToken = (req, res, next) => {
    // if running tests, set test user id and skip authentication
    if(isTest) {
        req.auth = {
            id: '5fb5d78d8ca5e50b293a0b6c'
        }
        return next();
    }

    const token = req.headers['auth-token'];
    if(!token) return res.status(401).send({
        success: false,
        error: 'no token provided'
    });
    
    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if(err) return res.status(500).send({
            success: false,
            error: 'failed to authenticate token'
        });
        req.auth = {
            id: decoded.id
        }
        next();
    });
}