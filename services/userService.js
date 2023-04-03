const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

genToken = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.secretKey,
        { expiresIn: '1h' });
}

class UserService {
    async registration(email, password) {
        const candidate = await userModel.findOne({ email: email })
        if (candidate) {
            throw new Error('Пользователь с таким email уже существует')
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await userModel.create({
            email,
            password: hashPassword,
        })
        const token = genToken(user.id, user.email)
        return token
    }

    async login(email, password) {
        const user = await userModel.findOne({ email: email })
        if (!user) {
            throw new Error('Пользователь не найден')
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            throw new Error('Указан неверный пароль')
        }
        const token = genToken(user.id, user.email)
        return token
    }

    async check(id, email) {
        const token = genToken(id, email)
        return token
    }

    async addfoto(userId, file) {
        if (file) {
            const newAvatar = await userModel.findByIdAndUpdate(userId, { avatar: file.originalname })
            return file
        }
    }

    async ProfileInfo(userId) {
        return await userModel.findById(userId, { email: 1, nick: 1, avatar: 1, description: 1, registration_date: 1 }).lean();
    }

    async updateNick(userId, nick) {
        return await userModel.findByIdAndUpdate(userId, { nick: nick }).lean();
    }

    async updateEmail(userId, email) {
        return await userModel.findByIdAndUpdate(userId, { email: email }).lean();
    }

}

module.exports = new UserService();