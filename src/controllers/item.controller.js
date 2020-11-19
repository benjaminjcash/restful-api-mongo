const Item = require("../models/item.model");

exports.createItem = (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        type: req.body.type
    });
    newItem.save()
        .then((data) => {
            res.json(data);
        }).catch(err => {
            res.send(err);
        })
}

exports.getItem = (req, res, next)  => {
    Item.findById(req.params.itemId)
        .then((data) => {
            if(data == null) {
                return next("no record found");
            } else {
                res.json(data);
            }
        }).catch(err => {
            res.send(err);
        });
}

exports.updateItem = (req, res) => {
    Item.findOneAndUpdate({ _id: req.params.itemId }, req.body, { new: true })
        .then((data) => {
            res.json(data);
        }).catch(err => {
            res.send(err);
        });
}

exports.deleteItem = (req, res) => {
    Item.findByIdAndDelete( req.params.itemId )
        .then(() => {
            res.json({ msg: "Deleted Successfully." });
        }).catch(err => {
            res.send(err);
        });
}
