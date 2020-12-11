const bcrypt = require('bcryptjs');
const { doRegisterUser, doGetUser, doGetUserWithPassword } = require("../utils/db-helpers");
const { refreshTokens, generateAccessToken, generateRefreshToken, verifyToken } = require('../utils/jwt-helpers');
const { accessSecret, refreshSecret } = require('../jwt-config');
const User = require('../models/user.model');

exports.registerUser = async (req, res) => {
    const passwordHash = bcrypt.hashSync(req.body.password);
    const newUser = new User({
        username: req.body.username,
        password: passwordHash,
        name: req.body.name,
        email: req.body.email
    });

    try {
        const user = await doGetUser(req.body.username);
        if(user) return res.status(200).send({
            success: false,
            error: "a user already exists"
        })
        await doRegisterUser(newUser);
        return res.json({
            success: true,
            message: "registered user"
        });
    }
    catch(err) {
        return res.send({
            success: false,
            error: err
        });
    }
}

exports.login = async (req, res) => {
    try {
        const user = await doGetUserWithPassword(req.body.username);
        if(!user) return res.status(400).send({ 
            success: false,
            error: 'no user found' 
        });
        const validPass = await bcrypt
                                    .compare(req.body.password, user.password)
                                    .catch((err) => {
                                        res.json({
                                            success: false,
                                            error: err
                                        });
                                    });
        if(!validPass) {
            return res.status(400).send({
                success: false,
                error: "wrong password"
            });
        }
        const accessToken = generateAccessToken(user._id, { expiresIn: 86400 });
        const refreshToken = generateRefreshToken(user._id, { expiresIn: 86400 });
        refreshTokens.push(refreshToken);
        res
            .header('access_token', accessToken)
            .send({
                success: true,
                message: 'logged in',
                token_type: 'bearer',
                access_token: accessToken,
                expires_in: 86400,
                refresh_token: refreshToken,
                name: user.name
            });
    }
    catch(err) {
        console.error(err);
        return res.send({
            success: false,
            error: err
        });
    }
}

exports.token = (req, res) => {
    const refreshToken = req.body.token;

    if(!refreshToken) return res.status(401).send({
        success: false,
        message: 'no token provided'
    });
    if(!refreshTokens.includes(refreshToken)) {
        res.status(403).send({
            success: false,
            message: 'invalid refresh token'
        });
    }
    
    const verified = verifyToken(refreshToken, refreshSecret, req, res);
    if(verified) {
        const accessToken = generateAccessToken(req.body._id, { expiresIn: 86400 });
        res.header('access_token', accessToken).send({
            success: true,
            message: 'logged in successfully',
            token_type: 'bearer',
            expires_in: 2000,
            refresh_token: refreshToken
        });
    }
}

exports.logout = (req, res) => {
    const { token } = res.body.token
    refreshTokens = refreshTokens.filter((t) => t != token);
    res.send({
        success: true,
        message: 'logout successful'
    });
}
