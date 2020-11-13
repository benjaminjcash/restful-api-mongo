const express = require('express');
const controller = require('../controllers/auth.controller');
const validateMiddleware = require('../middleware/validate.token.middleware');

const authRoutes = express.Router();

authRoutes.post('/register', controller.registerUser);
authRoutes.post('/login', controller.login);
authRoutes.post('/changepassword', validateMiddleware.validateToken, controller.changePassword);

module.exports = authRoutes;