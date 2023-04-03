const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nick: { type: String },
  avatar: { type: String },
  description: { type: String },
  registration_date: { type: Date, default: Date.now() },
  post: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
})

module.exports = model('User', UserSchema);