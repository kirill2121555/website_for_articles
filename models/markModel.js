const { Schema, model } = require('mongoose');

const MarkSchema = new Schema({
    Post_id: { type: Schema.Types.ObjectId, ref: 'Post' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    mark: {
        type: String,
        enam: ['1', '0'],
        required: true,
    }
})

module.exports = model('Mark', MarkSchema);