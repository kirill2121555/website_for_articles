const MarkModel = require('../models/markModel');

class MarkService {

    async postmark(iduser, id, mark) {
        const a = await MarkModel.findOne({ Post_id: id, user_id: iduser })
        if (!a) {
            const newMark = await MarkModel.create({ Post_id: id, user_id: iduser, mark: mark })
            return 'оценка созада'
        }
        if (a.mark === mark) {
            await MarkModel.findByIdAndDelete(a.id)
            return 'оценка такая стояла, ваша оценка была обнулена'
        }
        a.mark = mark
        await a.save()
        return a
    }

    async getYourMark(iduser, id) {
        const a = await MarkModel.findOne({ Post_id: id, user_id: iduser })
        if (a) {
            return a.mark
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