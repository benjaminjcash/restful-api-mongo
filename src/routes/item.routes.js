const express = require("express");
const { createItem, getAllItems, getItem, updateItem, deleteItem } = require("../controllers/item.controller");
const validateToken = require('../middleware/auth.middleware');

const itemRoutes = express.Router();

itemRoutes
    .post("/", validateToken, createItem)
    .get("/", validateToken, getAllItems)
    .get("/:itemId", validateToken, getItem)
    .put("/:itemId", validateToken, updateItem)
    .delete("/:itemId", validateToken, deleteItem);

module.exports = itemRoutes;