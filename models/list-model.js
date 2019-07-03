const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  listName: { type: String },
  beers: { type: Array }
})

const List = mongoose.model('List', listSchema);

module.exports = List;