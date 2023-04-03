const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    usernick:{type:String,default:'null'},
    text: { type: String, required: true },
    timeOfCreation: { type: Date,default: Date.now() },
    post_id:{type:Schema.Types.ObjectId, ref:'Post'},

})

module.exports = model('Comment', CommentSchema);