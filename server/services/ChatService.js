const Room = require('../entities/Room');
const Message = require('../entities/Messages');
const RoomMembers = require('../entities/RoomMembers');
const jwt = require("jsonwebtoken");
const { Op, Sequelize} = require('sequelize');

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

    // Создание комнаты для двух пользователей
    async createGroupRoom(usersList, chat_name) {
        // Создаем группу
        const room = await Room.create({
            type: 'group',  // Устанавливаем тип как group
        });

        // Добавляем участников в комнату
        for (const user_id of usersList) {
            await this.addMemberToRoom(room.room_id, user_id, chat_name);
        }

        console.log(`Групповая комната с участниками ${usersList.join(', ')} создана.`);
        return room;
    }

    async createPersonalRoom(user1_id, user2_id, user1_name, user2_name) {
        const existingRoom = await RoomMembers.findAll({
            where: {
                user_id: { [Op.in]: [user1_id, user2_id] },
            },
            attributes: ['room_id'], // Получаем только room_id
            group: ['room_id'], // Группируем по room_id
            having: Sequelize.literal('COUNT(DISTINCT user_id) = 2'),
        });
        console.log(existingRoom)
        if (existingRoom.length > 0) {
            return existingRoom[0];
        } else {
            // Если комнаты нет, создаем новую личную комнату
            const room = await Room.create({
                type: 'personal',  // Устанавливаем тип как personal
            });

            // Добавляем участников в комнату
            await this.addMemberToRoom(room.room_id, user1_id, user2_name);
            await this.addMemberToRoom(room.room_id, user2_id, user1_name);

            console.log(`Личная комната между пользователем ${user1_id} и ${user2_id} создана.`);
            return room;
        }
    }

// Функция для добавления владельца в room_members с ролью admin
    async addOwnerToRoom(room_id, owner_id) {
        await RoomMembers.create({
            room_id,
            user_id: owner_id,
            role: 'admin',
        });

        console.log(`Пользователь с id ${owner_id} стал администратором комнаты.`);
    }

// Функция для добавления участника в room_members
    async addMemberToRoom(room_id, user_id, chat_name) {
        await RoomMembers.create({
            room_id,
            user_id,
            chat_name,
            role: 'member',
        });

        console.log(`Пользователь с id ${user_id} добавлен как участник комнаты.`);
    }

    // Отправка сообщения
    async sendMessage({ roomId, message, type = 'text', token }) {
        try {
            const decoded = await this.getDecodedUser(token);
            const senderId = decoded.user_id;

            // Сохраняем сообщение в базе данных
            await Message.create({
                room_id: roomId,
                sender_id: senderId,
                text: message,
                type: type,
            });

            // Находим все сокеты участников комнаты
            const members = await RoomMembers.findAll({ where: { room_id: roomId } });
            members.forEach((member) => {
                const userSocket = this.activeUsers.get(member.user_id);
                if (userSocket) {
                    // Отправляем сообщение каждому онлайн пользователю
                    userSocket.emit('private_message', { senderId, message });
                } else {
                    console.log(`Пользователь с id ${member.user_id} не в сети. Сообщение сохранено.`);
                }
            });
        } catch (e) {
            console.error('Ошибка при отправке сообщения:', e.message);
        }
    }

    // Получить все сообщения для комнаты
    async getMessagesForRoom(roomId) {
        return await Message.findAll({
            where: { room_id: roomId },
            order: [['createdAt', 'ASC']],
        });
    }

    async getRoomsForUsers(user_id) {
        try{
            const userRooms = await RoomMembers.findAll({
                where: { user_id },
                  // Включаем информацию о комнате
            });

            // Если нет чатов
            if (userRooms.length === 0) {
                return []
            }

            // Шаг 2: Возвращаем все комнаты с их данными
            return userRooms
        } catch (e){
            console.error('Ошибка при получении чатов пользователя:', e);
            return 'Ошибка при получении чатов пользователя:'+e.message
        }

    }

    async getDecodedUser(token) {
        if (!token) {
            throw new Error('Authorization token is missing');
        }

        return jwt.verify(token, process.env.JWT_SECRET_KEY || 'your_default_secret_key');
    }
}

module.exports = new ChatService();
