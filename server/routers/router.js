// routes/users.js
const express = require('express');
const UserController = require('../controllers/UserController')
const AuthController = require('../controllers/AuthController')
const router = express.Router();

// Описание маршрута GET /users
router.get('/users', UserController.list);
router.post('/auth/signup', AuthController.register)
module.exports = router;