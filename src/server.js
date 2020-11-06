const express = require("express");
const bodyParser = require("body-parser");
const itemRoutes = require("./routes/item.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/item", itemRoutes);

app.listen(PORT, function() {
    console.log(`Server listening on PORT ${PORT}...`);
});
