const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { sanitizeObject } = require("../utils/helpers");

exports.getUser = async (req, res) => {
    const decoded = req.auth.id;
    if(decoded) {
        try {
            const user = await User.findById(decoded);
            if(!user) return res.status(400).send({ 
                success: false,
                error: 'no user found' 
            });
            return res.json({
                success: true,
                data: user
            });
        }
        catch(err) {
            console.log(err);
            return res.send({
                success: false,
                error: err
            });
        }
    }
}

exports.getUserWithPassword = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id).select("+password").exec((err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}

exports.updateUser = async (req, res) => {
    const decoded = req.auth.id;
    if(decoded) {
        let user = {};
        Object.assign(user, req.body);
        const currentPassword = req.body.current_password;
        if(!currentPassword) {
            return res.json({
                success: false,
                data: "no password provided"
            });
        }
        try {
            const { password: savedPassword } = await this.getUserWithPassword(decoded);
            const valid = await bcrypt.compare(currentPassword, savedPassword);
            if(!valid) {
                return res.json({
                    success: false,
                    data: "invalid password"
                });
            }
            if(user.new_password) {
                const newPasswordHash = bcrypt.hashSync(user.new_password);
                user.password = newPasswordHash;
                delete user.new_password;
            }
            user = sanitizeObject(user);
            User.findOneAndUpdate({ _id: decoded }, user, (err, data) => {
                if(err) {
                    return res.json({
                        success: false,
                        message: err
                    });
                }
                if(data) {
                    return res.json({
                        success: true,
                        message: "updated successfully"
                    });
                }
            });
        }
        catch(err) {
            console.error(err);
            return res.json({
                success: false,
                message: err
            });
        }
    }
}

exports.deleteUser = async (req, res) => {
    const decoded = req.auth.id;
    if(decoded) {
        try {
            const user = await User.findByIdAndDelete();
            if(!user) return res.status(400).send({ 
                success: false,
                error: 'no user found' 
            });
            return res.json({
                success: true,
                data: data
            });
        }
        catch(err) {
            return res.send({
                success: false,
                error: err
            });
        }
    }
}