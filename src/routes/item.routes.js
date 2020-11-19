const { createItem, getItem, updateItem, deleteItem } = require("../controllers/item.controller");
const express = require("express");
const { validateToken } = require('../middleware/validate.token.middleware');

const itemRoutes = express.Router();

itemRoutes
    .post("/", validateToken, createItem)
    .get("/:itemId", validateToken, getItem)
    .put("/:itemId", validateToken, updateItem)
    .delete("/:itemId", validateToken, deleteItem);

module.exports = itemRoutes;