const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
  beerName: { type: String, required: true },
  breweryName: { type: String, required: true },
  beerRating: Number,
  beerNotes: { type: String },
  date: { type: Date, default: Date.now }
});

const Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;