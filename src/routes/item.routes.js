const itemController = require("../controllers/item.controller");
const express = require("express");

const itemRoutes = express.Router();

itemRoutes
    .post("/", itemController.createItem)
    .get("/:itemId", itemController.getItem)
    .put("/:itemId", itemController.updateItem)
    .delete("/:itemId", itemController.deleteItem);

module.exports = itemRoutes;