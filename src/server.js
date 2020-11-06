const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const itemRoutes = require("./routes/item.routes");
const middleware = require("./middleware/errors.middleware");
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restful-api-mongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', function(err) {
    console.error("Unable to connect to Mongo..");
    console.error(err);
    db.db.close();
});
db.once('open', function() {
    console.log(`Connection to Mongo was successful!`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/item", itemRoutes);

app.use(middleware.error204);
app.use(middleware.error404);

app.listen(PORT, function() {
    console.log(`Server listening on PORT ${PORT}...`);
});
