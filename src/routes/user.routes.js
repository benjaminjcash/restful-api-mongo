const express = require('express');
const { getUser, deleteUser, updateUser } = require('../controllers/user.controller');
const validateToken = require('../middleware/auth.middleware');

const userRoutes = express.Router();

userRoutes
    .get('/me', validateToken, getUser)
    .put('/update/me', validateToken, updateUser)
    .delete('/delete/me', validateToken, deleteUser);

module.exports = userRoutes;