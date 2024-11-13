const authService = require('../services/AuthService')
class AuthController {
    
   async register(req, res){
    try{                      
      const message = await authService.register(req)
      res.json(message)
    }catch(e){
      res.status(500).json(e)
    } 
   }
  }
  
  module.exports = new AuthController();