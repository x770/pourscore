const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true},
  password: { type: String, required: true, trim: true },
  beers: [{ type: Schema.Types.ObjectId, ref: 'Beer' }],
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;