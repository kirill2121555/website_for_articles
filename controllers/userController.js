const userService = require('../services/userService')
const logger = require('./../loger/loger')

class UserController {
  async registration(req, res) {
    try {
      const { email, password } = req.body
      const token = await userService.registration(email, password)
      return res.status(201).json({ token })
    } catch (error) {
      logger.error('Error in UserController.registration ' + error.message);
      return res.status(400).json(error.message)
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body
      const token = await userService.login(email, password)
      return res.status(201).json({ token })
    } catch (error) {
      logger.error('Error in UserController.login ' + error.message);
      return res.status(400).json(error.message)
    }
  }

  async check(req, res) {
    const token = userService.chech(req.user.id, req.user.email)
    return res.json({ token })
  }

  async ProfileInformation(req, res) {
    try {
      const userId = req.user.id
      const user = await userService.ProfileInfo(userId)
      return res.status(200).json(user)
    } catch (error) {
      logger.error('Error in UserController.ProfileInformation ' + error.message);
      return res.status(400).json(error.message)
    }
  }

  async updateNick(req, res) {
    try {
      const { nick } = req.body
      const userId = req.user.id
      await userService.updateNick(userId, nick)
      return res.status(204)
    }
    catch (error) {
      logger.error('Error in UserController.updateNick ' + error.message);
      return res.status(400).json(error.message)
    }
  }

  async updateEmail(req, res) {
    try {
      const userId = req.user.id
      const { email } = req.body
      await userService.updateEmail(userId, email)
      return res.status(204)
    } catch (error) {
      logger.error('Error in UserController.updateEmail ' + error.message);
      return res.status(400).json(error.message)
    }
  }

  async addFoto(req, res) {
    try {
      const userId = req.user.id
      await userService.addfoto(userId, req.file)
      return res.status(201)
    } catch (error) {
      logger.error('Error in UserController.addFoto ' + error, message);
      return res.status(400).json(error.message)
    }
  }
}
module.exports = new UserController();



