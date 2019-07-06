const router = require('express').Router();
const db = require('../../models');

router.route('/')
  .post(function (req, res) {
    db.User.findOne({
      username: req.body.username,
      password: req.body.password
    }).then(dbUser => {
      if (dbUser) {
        res.json([dbUser, '/dashboard']);
      }

      if (!dbUser) {
        console.log('Sorry, user does not exist');
        res.json('Could not log you in');
      }
    });
  });
  
module.exports = router;