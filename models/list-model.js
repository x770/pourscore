const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  beers: [{type : Schema.Types.ObjectId, ref: 'List'}]
})

const List = mongoose.model('List', listSchema);

module.exports = List;