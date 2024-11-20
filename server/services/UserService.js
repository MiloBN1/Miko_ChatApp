const User = require('../entities/User');

class UserService {
    // Получение списка пользователей
    async list(req) {
        try {
            console.log(User)
            const users = await User.findAll(); // Получаем всех пользователей из базы данных
            if (!users || users.length === 0) {
                return {message: 'Users not found'};
            }

            // Возвращаем список пользователей в формате JSON
            return users;
        } catch (error) {
            console.error('Ошибка при получении списка пользователей:', error);
            return {message: 'Ошибка сервера'};
        }
    }

}

module.exports = new UserService();
