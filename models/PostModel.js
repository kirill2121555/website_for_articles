const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    name: { type: String, required: true, index: 'text' },
    text: { type: String, required: true, index: 'text' },
    datecreate: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
})

module.exports = model('Post', postSchema);