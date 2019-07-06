const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

let userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true},
  password: { type: String, required: true, trim: true },
  beers: { type: Array },
  lists: { type: Array }
});

// userSchema.pre('save', function (next) {
//   const user = this;

//   if (!user.isModified('password')) return next();

//   bcrypt.genSalt(10, function (err, salt) {
//     if (err) return next(err);

//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) return next(err);

//       user.password = hash;
//       next();
//     })
//   })
// })

const User = mongoose.model('User', userSchema);

module.exports = User;