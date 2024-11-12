class UserController {
     /**
   * @swagger
   * /users:
   *   get:
   *     description: Получить список пользователей
   *     responses:
   *       200:
   *         description: Список пользователей
   */
    list(req, res) {
      res.send('Список пользователей');
    }
  
    getUser(req, res) {
      res.send(`Пользователь с ID: ${req.params.id}`);
    }
  }
  
  module.exports = new UserController();