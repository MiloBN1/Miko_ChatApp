const Room = require('../entities/Room');
const Message = require('../entities/Messages');
const User = require('../entities/User');
const { Op } = require('sequelize');

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

    // Поиск пользователя по username
    async getUserIdByUsername(username) {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            throw new Error(`Пользователь с именем ${username} не найден`);
        }
        return user.user_id;
    }

    // Создание комнаты для двух пользователей
    async createRoom(userId1, userId2) {
        const room = await Room.findOne({
            where: {
                user_ids: {
                    [Op.contains]: [userId1, userId2], // Ищем комнату, которая содержит этих пользователей
                }
            }
        });

        // Если комнаты нет, создаем новую
        if (!room) {
            const newRoom = await Room.create({
                user_ids: [userId1, userId2],
            });
            console.log(`Комната создана для пользователей ${userId1} и ${userId2}`);
            return newRoom.room_id;
        }
        return room.room_id; // Если комната существует, возвращаем ее id
    }

    // Отправка сообщения
    async sendMessage({ senderUsername, receiverUsername, message, type = 'text' }) {
        try {
            // Получаем user_id для отправителя и получателя
            const senderId = await this.getUserIdByUsername(senderUsername);
            const receiverId = await this.getUserIdByUsername(receiverUsername);

            // Создаем комнату или находим существующую
            const roomId = await this.createRoom(senderId, receiverId);

            // Сохраняем сообщение в базу данных
            const newMessage = await Message.create({
                room_id: roomId,
                sender_id: senderId,
                text: message,
                type: type,
            });

            const receiverSocket = this.activeUsers.get(receiverId);
            receiverSocket.emit('private_message', { senderUsername, message });

            return newMessage;
        } catch (e) {
            console.error('Ошибка при отправке сообщения:', e.message);
        }
    }

    // Получить все сообщения для комнаты
    async getMessagesForRoom(roomId) {
        return  await Message.findAll({
            where: { room_id: roomId },
            order: [['createdAt', 'ASC']], // Сортировка по времени создания
        });
    }
}

module.exports = new ChatService();
