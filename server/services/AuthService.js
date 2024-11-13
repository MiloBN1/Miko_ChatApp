const User = require('../entities/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Role = require('../entities/Role')
class AuthService {

    async register(req) {
        try {
            this.validateRequest(req);

            const { username, password, email } = req.body;

            await this.checkUserExistence(username);

            const hashedPassword = this.hashPassword(password);

            const user = await this.createUser(username, hashedPassword, email);

            const token = this.generateToken(user);

            return {
                message: 'User has been registered',
                access_token: token
            };
        } catch (e) {
            throw new Error('Registration error: ' + e.message);
        }
    }

    validateRequest(req) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error('Validation errors: ' + errors.array().join(', '));
        }
    }

    async checkUserExistence(username) {
        const candidate = await User.findOne({ where: { username } });
        if (candidate) {
            throw new Error('This login is already in the system');
        }
    }

    hashPassword(password) {
        return bcrypt.hashSync(password, 7); 
    }

    async createUser(username, hashedPassword, email) {
        const userRole = await Role.findOne({ where: { value: 'user' } });
    
        if (!userRole) {
            throw new Error('User role not found');
        }
    
        return await User.create({
            username,
            password: hashedPassword,
            email,
            role: userRole.value // Ensure 'role' is assigned correctly
        });
    }
    
    
    generateToken(user) {
        const payload = {
            user_id: user.user_id,
            username: user.username,
            email: user.email
        };

        const secretKey = process.env.JWT_SECRET_KEY || 'your_default_secret_key'; // Секретный ключ для подписи
        return jwt.sign(payload, secretKey, { expiresIn: '1h' });  // Генерация токена с истечением через 1 час
    }

    async searchUserInDB(username) {
        try {
            const user = await User.findOne({ where: { username } });
            return user;
        } catch (e) {
            throw new Error('Error searching for user: ' + e.message);
        }
    }
}

module.exports = new AuthService();
