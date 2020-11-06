exports.createItem = function(req, res) {
    res.send("item created");
}

exports.getItem = function(req, res) {
    res.send("item");
}

exports.updateItem = function(req, res) {
    res.send("updated item");
}

exports.deleteItem = function(req, res) {
    res.send("deleted item");
}
