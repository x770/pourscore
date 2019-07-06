const router = require('express').Router();
const db = require('../../models');

router.route('/:username')
  .get((req, res) => {
    db.User.findOne({
      username: req.params.username
    }).then(dbUser => {
      res.json(dbUser);
    })
  });

module.exports = router;