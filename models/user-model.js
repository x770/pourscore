const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  beers: { type: Array },
  lists: { type: Array }
});

const User = mongoose.model('User', userSchema);

module.exports = User;