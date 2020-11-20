const express = require('express');
const { registerUser, login, logout, token } = require('../controllers/auth.controller');

const authRoutes = express.Router();

authRoutes
    .post('/register', registerUser)
    .post('/login', login)
    .post('/token', token)
    .post('/logout', logout);

module.exports = authRoutes;