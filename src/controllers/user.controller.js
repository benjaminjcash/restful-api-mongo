const User = require('../models/user.model');

exports.getUser = function(req, res) {
    console.log(req.auth.id);
    User.findById(req.auth.id, function(err, data) {
        console.log(data);
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

exports.deleteUser = function(req, res) {
    User.findByIdAndDelete(req.auth.id, function(err, data) {
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