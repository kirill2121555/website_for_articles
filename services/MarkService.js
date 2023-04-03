const MarkModel = require('../models/markModel');

class MarkService {

    async postmark(iduser, id, mark) {
        const mark_exists = await MarkModel.findOne({ Post_id: id, user_id: iduser })
        if (!mark_exists) {
            await MarkModel.create({ Post_id: id, user_id: iduser, mark: mark })
            return
        }
        if (mark_exists.mark === mark) {
            await MarkModel.findByIdAndDelete(a.id)
            return
        }
        mark_exists.mark = mark
        await mark_exists.save()
        return
        }

    async getYourMark(iduser, id) {
        const mark = await MarkModel.findOne({ Post_id: id, user_id: iduser })
        if (mark) {
            return mark.mark
        }
        return {mark:null}
    }

    async getmark(id) {
        const like = await MarkModel.find({ Post_id: id, mark:1 }).countDocuments()
        const dislike = await MarkModel.find({ Post_id: id, mark:0 }).countDocuments()
        return {like:like,dislike:dislike}
    }
}
module.exports = new MarkService();