class UserController {
    
    list(req, res) {
      res.send('Список пользователей');
    }
  
    getUser(req, res) {
      res.send(`Пользователь с ID: ${req.params.id}`);
    }
  }
  
  module.exports = new UserController();