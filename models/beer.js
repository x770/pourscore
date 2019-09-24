const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const beerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  lists: [{
    type: Schema.Types.ObjectId,
    ref: 'List'
  }],
  name: {
    type: String,
    required: true
  },
  brewery: {
    type: String,
    required: true
  },
  beerRating: {
    type: Number,
  },
  beerNotes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Beer", beerSchema);