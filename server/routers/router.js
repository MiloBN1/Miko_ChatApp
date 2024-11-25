const express = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const AccountController = require('../controllers/AccountController');
const ChatController = require('../controllers/ChatController');
const router = express.Router();

// Описание маршрута GET /users
router.get('/users', UserController.list);
router.post('/auth/signup', AuthController.register);
router.post('/auth/signin', AuthController.login);
router.get('/user/me', AccountController.getMe);
router.post('/room/group/new', ChatController.createGroupRoom);
router.post('/room/personal/new', ChatController.createPersonalRoom);
router.get('/room/:room_id/messages', ChatController.getMessagesForRoom);
router.get('/user/:user_id/chats', ChatController.getUserChats);
module.exports = router;
