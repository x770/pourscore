const db = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOne: function (req, res) {
    db.User
      .findOne({ username: req })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function ({ username, password }) {
    const hashedPassword = bcrypt.hashSync(password, 10, null);
    db.User
      .create(
        {
          username: username,
          password: hashedPassword
        })
  }
}