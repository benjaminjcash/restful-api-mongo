const express = require('express');
const { validateToken } = require('../middleware/validate.token.middleware');
const { registerUser, login, changePassword } = require('../controllers/auth.controller');

const authRoutes = express.Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', login);
authRoutes.post('/changepassword', validateToken, changePassword);

module.exports = authRoutes;