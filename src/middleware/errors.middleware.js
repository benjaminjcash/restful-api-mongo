
exports.error204 = function(err, req, res, next) {
    if(err == "no record found.") {
        res.status(204).send();
    } else {
        next();
    }
}

exports.error404 = function(req, res, next) {
    res.status(404).send({
        status: 404,
        error: "Not Found"
    });
}
