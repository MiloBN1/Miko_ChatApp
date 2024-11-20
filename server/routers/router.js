const express = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const AccountController = require('../controllers/AccountController');
const router = express.Router();

// Описание маршрута GET /users
router.get('/users', UserController.list);
router.post('/auth/signup', AuthController.register);
router.post('/auth/signin', AuthController.login);
router.get('/user/me', AccountController.getMe);

module.exports = router;
