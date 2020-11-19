const express = require('express');
const { getUser, deleteUser } = require('../controllers/user.controller');
const { validateToken } = require('../middleware/validate.token.middleware');

const userRoutes = express.Router();

userRoutes
    .get('/me', validateToken, getUser)
    .delete('/delete/me', validateToken, deleteUser);

module.exports = userRoutes;