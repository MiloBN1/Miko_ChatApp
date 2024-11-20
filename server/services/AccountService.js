const User = require('../entities/User');
const jwt = require('jsonwebtoken');

class AccountService{

    async getMe(req) {
        try {
            // Получаем токен из заголовков запроса
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new Error('Authorization token is missing');
            }

            // Декодируем токен и извлекаем payload
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'your_default_secret_key');

            // Ищем пользователя в базе данных
            const user = await User.findOne({ where: { user_id: decoded.user_id } });

            if (!user) {
                throw new Error('User not found');
            }

            // Возвращаем данные пользователя
            return {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role,
            };
        } catch (e) {
            throw new Error('Error fetching user data: ' + e.message);
        }
    }
}

module.exports = new AccountService();