const accountService = require('../services/AccountService');

class AccountController {
    async getMe(req, res){
        try{
            const message = await accountService.getMe(req)
            res.json(message)
        }catch(e){
            res.status(500).json(e)
        }
    }
}

module.exports = new AccountController();