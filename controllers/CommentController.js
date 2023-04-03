const logger = require('../loger/loger')
const CommentService = require('../services/CoomentServies')


class CommentController {
    async CreateComment(req, res) {
        try {
            const { comment, date } = req.body
            const idPost = req.params.id;
            const idUser = req.user.id
            const newComment = await CommentService.createcomment(comment, date, idPost, idUser)
            return res.status(200).json({ newComment })
        } catch (error) {
            logger.error('Error in CommentController.CreateComment ' + error.message);
            return res.status(400).json(error.message)
        }
    }

    async GetComments(req, res) {
        try {
            const idPost = req.params.id;
            const comm = await CommentService.GetComments(idPost)
            return res.status(200).json(comm)
        } catch (error) {
            logger.error('Error in CommentController.GetComments '+error.message);
            return res.status(400).json(error.message)
        }
    }
}

module.exports = new CommentController();



