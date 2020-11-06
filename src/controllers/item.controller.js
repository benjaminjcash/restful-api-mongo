const Item = require("../models/item.model");

exports.createItem = function(req, res) {
    const newItem = new Item({
        name: req.body.name,
        type: req.body.type
    });
    newItem.save(function(err, data) {
        if(err) res.send(err);
        res.json(data);
    });
}

exports.getItem = function(req, res, next) {
    Item.findById(req.params.itemId, function(err, data) {
        if(err) res.send(err);
        if(data == null) {
            next("no record found");
        } else {
            res.json(data);
        }
    });
}

exports.updateItem = function(req, res) {
    Item.findOneAndUpdate(
        { _id: req.params.itemId }, 
        req.body, 
        { new: true }, 
        function(err, data) {
            if(err) res.send(err);
            res.json(data);
        }
    );
}

exports.deleteItem = function(req, res) {
    Item.deleteOne(
        { _id: req.params.itemId },
        function(err) {
            if(err) res.send(err);
            res.json({ msg: "Deleted Successfully." });
        }
    );
}
