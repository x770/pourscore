const db = require('../models');

module.exports = {
  create: function ({ username, password }) {
    db.User
      .create(
        {
          username: username,
          password: password
        })
  },
  addBeer: function (username, { beerEntry } ) {
    db.User.findOneAndUpdate({username: username}, {
      $push: {beers: beerEntry}
    })
  }
}