const itemController = require("../controllers/item.controller");
const express = require("express");
const validateMiddleware = require('../middleware/validate.token.middleware');

const itemRoutes = express.Router();

itemRoutes
    .post("/", validateMiddleware.validateToken, itemController.createItem)
    .get("/:itemId", validateMiddleware.validateToken, itemController.getItem)
    .put("/:itemId", validateMiddleware.validateToken, itemController.updateItem)
    .delete("/:itemId", validateMiddleware.validateToken, itemController.deleteItem);

module.exports = itemRoutes;