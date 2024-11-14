const chatService = require('../services/ChatService');

class ChatController {
    onConnection(socket) {
        console.log('Пользователь подключился:', socket.id);

        // Пользователь присоединяется к чату
        socket.on('join', (userId) => {
            chatService.connectUser(userId, socket);
        });

        // Обработка входящих сообщений
        socket.on('private_message', ({ senderId, receiverId, message }) => {
            chatService.sendMessage({ senderId, receiverId, message });
        });

        // Отключение пользователя
        socket.on('disconnect', () => {
            chatService.disconnectUser(socket);
        });
    }
}

module.exports = new ChatController();
