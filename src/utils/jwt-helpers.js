const jwt = require("jsonwebtoken");
const jwtConfig = require("../jwt-config");

// store for refresh tokens
let refreshTokens = [];

const generateAccessToken = (id, expiresIn) => jwt.sign({ id }, jwtConfig.accessSecret, expiresIn);
const generateRefreshToken = (id, expiresIn) => jwt.sign({ id }, jwtConfig.refreshSecret, expiresIn);

const verifyToken = (token, secret, req, res) => {
    try {
        return jwt.verify(token, secret);
    }
    catch(err) {
        console.error(err);
        res.status(500).send({ 
            success: false, 
            message: 'failed to authenticate token'
        });
    }
}

const logout = (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token != refreshToken);
    res.json({
        success: true,
        message: "logout successful"
    });
}

module.exports = {
    refreshTokens,
    logout,
    generateAccessToken,
    generateRefreshToken,
    verifyToken
}