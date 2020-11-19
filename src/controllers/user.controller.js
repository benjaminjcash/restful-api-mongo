const User = require('../models/user.model');

exports.getUser = (req, res) => {
    User.findById(req.auth.id, (err, data) => {
        if(err) return res.send({
            success: false,
            error: err
        });
        if(!data) return res.status(400).send({ 
            success: false,
            error: 'no user found' 
        });
        return res.json({
            success: true,
            data: data
        });
    });
}

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.auth.id, (err, data) => {
        if(err)  return res.send({
            success: false,
            error: err
        });
        if(!data) return res.status(400).send({ 
            success: false,
            error: 'no user found' 
        });
        return res.json({
            success: true,
            data: data
        });
    });
}