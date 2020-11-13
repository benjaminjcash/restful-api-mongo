const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt-config');

exports.validateToken = function(req, res, next) {
    const token = req.headers['auth-token'];
    if(!token) return res.status(401).send({
        success: false,
        error: 'no token provided'
    });
    
    jwt.verify(token, jwtConfig.secret, function(err, decoded) {
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