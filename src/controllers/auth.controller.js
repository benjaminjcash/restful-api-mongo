const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtconfig = require('../jwt-config');
const User = require('../models/user.model');

exports.registerUser = function(req, res) {
    const passwordHash = bcrypt.hashSync(req.body.password);
    const newUser = new User({
        username: req.body.username,
        password: passwordHash,
        name: req.body.name,
        email: req.body.email
    });
    newUser.save(function(err, data) {
        if(err) return res.send({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            data: data
        });
    });
}

exports.login = function(req, res) {
    User.findOne({ username: req.body.username }, '+password', function(err, data) {
        if(err) res.send({
            success: false,
            error: err
        });
        if(!data) return res.status(400).send({ 
            success: false,
            error: 'no user found' 
        });
        bcrypt.compare(req.body.password, data.password, function(err, valid) {
            if(err) return res.send({
                success: false,
                error: err
            });
            if(!valid) return res.status(400).send({
                success: false,
                error: "wrong password"
            });
            const token = jwt.sign({ id: data._id }, jwtconfig.secret, { expiresIn: "1h" });
            return res.header('auth-token', token).send({
                success: true,
                message: 'logged in'
            });
        });
    });
}