const Item = require("../models/item.model");
const { doGetItem, doGetAllItems, doUpdateItem } = require("../utils/db-helpers");

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

exports.getAllItems = async (req, res) => {
    try {
        const items = await doGetAllItems();
        if(items.length == 0) {
            return res.json({
                success: false,
                error: "no records found"
            });
        } else {
            res.json({
                success: true,
                data: items
            });
        }
    }
    catch(err) {
        console.log(err);
        res.send({
            success: false,
            error: err
        });
    }
}

exports.getItem = async (req, res)  => {
    try {
        const item = await doGetItem(req.params.itemId);
        if(item == null) {
            return res.json({
                success: false,
                error: "no record found"
            });
        } else {
            res.json({
                success: true,
                data: item
            });
        }
    }
    catch(err) {
        console.log(err);
        res.send({
            success: false,
            error: err
        });
    }
}

exports.updateItem = async (req, res) => {
    try {
        const item = await doUpdateItem(req.params.itemId, req.body);
        if(item == null) {
            return res.json({
                success: false,
                error: "no record found"
            });
        } else {
            res.json({
                success: true,
                data: item
            });
        }
    }
    catch(err) {
        console.log(err);
        res.send({
            success: false,
            error: err
        });
    }
}

exports.deleteItem = (req, res) => {
    Item.findByIdAndDelete( req.params.itemId )
        .then(() => {
            res.json({ msg: "Deleted Successfully." });
        }).catch(err => {
            res.send(err);
        });
}
