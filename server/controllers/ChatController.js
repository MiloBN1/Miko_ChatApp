const chatService = require('../services/ChatService');

class ChatController {
    onConnection(socket) {
        console.log('Пользователь подключился:', socket.id);

        // Пользователь присоединяется к чату
        socket.on('join', (userId) => {
            chatService.connectUser(userId, socket);
        });

        // Обработка входящих сообщений
        socket.on('private_message', ({ roomId, message, token }) => {
            console.log(token)
            chatService.sendMessage({ roomId, message, token });
        });

        // Отключение пользователя
        socket.on('disconnect', () => {
            chatService.disconnectUser(socket);
        });
    }

    async createGroupRoom(req,res){
        const {users, room_name} = req.body;
        console.log(req.body)
        const message = await chatService.createGroupRoom(users, room_name);
        res.json(message)
    }

    async createPersonalRoom(req,res){
        const {user1, user2, user1_name, user2_name} = req.body;
        console.log(req.body)
        const message = await chatService.createPersonalRoom(user1, user2, user1_name, user2_name);
        res.json(message)
    }

    async getMessagesForRoom(req,res){
        const {room_id} = req.params
        console.log(room_id)
        const message = await chatService.getMessagesForRoom(room_id)
        res.json(message)
    }

    async getUserChats(req,res){
        const {user_id} = req.params;
        const message = await chatService.getRoomsForUsers(user_id);
        res.json(message)
    }
}

module.exports = new ChatController();
