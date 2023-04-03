const logger = require('../loger/loger')
const MarkService = require('../services/MarkService')

class MarkController {

    async grade(req, res) {
        try {
            const iduser = req.user.id
            const id = req.params.id
            const mark = req.params.mark
            await MarkService.postmark(iduser, id, mark)
            return res.status(201)
        } catch (error) {
            logger.error('Error in MarkController.grade '+error.message);
            return res.status(400).json(error.message)
        }
    }

    async getUserMark(req, res) {
        try {
            const iduser = req.user.id
            const id = req.params.id
            const mark=await MarkService.getYourMark(iduser, id)
            return res.status(200).json(mark)
        } catch (error) {
            logger.error('Error in MarkController.getUserMark '+error.message);
            return res.status(400).json(error.message)
        }
    }
    async getmarkpost(req, res) {
        try {
            const id = req.params.id
            const mark=await MarkService.getmark(id)
            return res.status(200).json(mark)
        } catch (error) {
            logger.error('Error in MarkController.getmarkpost '+error.message);
            return res.status(400).json(error.message)
        }
    }
}

module.exports = new MarkController();



