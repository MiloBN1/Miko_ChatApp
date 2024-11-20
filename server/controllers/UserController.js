const userService = require('../services/UserService');

class UserController {
    // Получение списка пользователей
    async list(req, res) {
        const message = await userService.list(req)
        res.json(message)
    }

}

module.exports = new UserController();
