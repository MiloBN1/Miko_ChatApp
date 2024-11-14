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

   async login(req, res){
      const message = await authService.login(req)
      res.json(message)
   }
  }
  
  module.exports = new AuthController();