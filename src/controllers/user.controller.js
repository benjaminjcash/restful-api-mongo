const User = require('../models/user.model');

exports.getUser = async (req, res) => {
    console.log(req, res);
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