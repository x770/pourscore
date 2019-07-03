const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beerSchema = new Schema({
  beerName: { type: String, required: true },
  brewery: { type: String, required: true },
  rating: Number,
  date: { type: Date, default: Date.now },
  lists: {}
});

const Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;