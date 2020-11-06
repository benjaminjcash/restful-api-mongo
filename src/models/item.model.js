const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: "An item name is required to create a new item."
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: "A type is required to create an item."
    }
});

module.exports = mongoose.model('Item', ItemSchema);
