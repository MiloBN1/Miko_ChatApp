import User from "../models/User.model.js";
import Role from "../models/Role.js";
import { secret } from "../config.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from "express-validator";

class AuthService{
    async register(req){
        try {
            const errors = validationResult(req)
            
            if(!errors.isEmpty()) return 'Something wrong in reg: '+errors 

            const {username, password} = req
            const candidate = await User.findOne({username})

            if(candidate) return 'this login already in system' 

            const userRole = await Role.findOne({value:'USER'})
            const hashedPassword = bcrypt.hashSync(password, 7)           
            const user = new User ({username, password: hashedPassword, roles:[userRole.value]})

            await user.save()
            return 'user has been registered'
        } catch (e) {
           return 'Registration error: '+e
        }
    } 

    searchUserInDB(){

    }
}