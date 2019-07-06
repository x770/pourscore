const db = require('../models');

module.exports = {
  create: function ({ username, password }) {
    db.User
      .create(
        {
          username: username,
          password: password
        })
  }
}