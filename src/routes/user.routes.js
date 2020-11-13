const express = require('express');
const userController = require('../controllers/user.controller');
const validateMiddleware = require('../middleware/validate.token.middleware');

const userRoutes = express.Router();

userRoutes
    .get('/me', validateMiddleware.validateToken, userController.getUser)
    .delete('/delete/me', validateMiddleware.validateToken, userController.deleteUser);

module.exports = userRoutes;