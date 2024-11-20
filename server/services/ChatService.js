class ChatService {
    constructor() {
        this.activeUsers = new Map(); // userId -> socket
        this.rooms = new Map(); // roomId -> { participants: Set<userId>, messages: [] }
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

    // Создание комнаты
    createRoom(userId1, userId2) {
        const roomId = `${userId1}_${userId2}`; // Уникальный идентификатор комнаты
        if (!this.rooms.has(roomId)) {
            this.rooms.set(roomId, {
                participants: new Set([userId1, userId2]),
                messages: [],
            });
            console.log(`Комната ${roomId} создана для пользователей ${userId1} и ${userId2}`);
        }
        return roomId;
    }

    // Отправка сообщения
    sendMessage({ senderId, receiverId, message }) {
        // Создаем комнату, если ее еще нет
        const roomId = this.createRoom(senderId, receiverId);

        // Сохраняем сообщение в комнату
        const room = this.rooms.get(roomId);
        if (room) {
            room.messages.push({ senderId, message, timestamp: new Date() });
        }

        // Проверяем, в сети ли получатель
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
