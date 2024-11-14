// routes/users.js
const express = require('express');
const UserController = require('../controllers/UserController')
const AuthController = require('../controllers/AuthController')
const router = express.Router();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);
const chatController = require('../controllers/ChatController')

// Описание маршрута GET /users
router.get('/users', UserController.list);
router.post('/auth/signup', AuthController.register)
router.post('/auth/signin', AuthController.login)


io.on('connection', (socket) => {
    chatController.onConnection(socket);
});


module.exports = router;