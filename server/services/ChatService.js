class ChatService {
    constructor() {
        this.activeUsers = new Map(); // userId -> socket
    }

    // Подключение пользователя
    connectUser(userId, socket) {
        this.activeUsers.set(userId, socket);
        console.log(`Пользователь ${userId} подключен`);
    }

    // Отключение пользователя
    disconnectUser(socket) {
        for (const [userId, userSocket] of this.activeUsers.entries()) {
            if (userSocket === socket) {
                this.activeUsers.delete(userId);
                console.log(`Пользователь ${userId} отключился`);
                break;
            }
        }
    }

    // Отправка сообщения
    sendMessage({ senderId, receiverId, message }) {
        const receiverSocket = this.activeUsers.get(receiverId);
        if (receiverSocket) {
            receiverSocket.emit('private_message', { senderId, message });
            console.log(`Сообщение от ${senderId} отправлено пользователю ${receiverId}`);
        } else {
            console.log(`Пользователь ${receiverId} не в сети`);
        }
    }
}

module.exports = new ChatService();
