const commentModel = require('../models/commentModel');
const userModel = require('../models/userModel')

class CommentService {
    async createcomment(comment, date, idPost, idUser) {
        const user = await userModel.findById(idUser)
        const newComment = await commentModel.create({
            user_id: user._id,
            usernick: user.email,
            text: comment,
            timeOfCreation: date,
            post_id:idPost,
        })
        return newComment
    }

    async GetComments(post_id) {
        let postcomment = await commentModel.find({post_id:post_id}).sort({timeOfCreation: -1})        
        return postcomment
    }
}

module.exports = new CommentService();