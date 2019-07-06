const router = require('express').Router();
const db = require('../../models');

router.route('/')
  .post(function (req, res) {
    console.log(req.body);
    db.User.create({
      username: req.body.username,
      password: req.body.password
    }).then(function () {
      res.redirect(307, '/api/login');
    }).catch(err => {
      console.log(err);
      res.json(err);
    });
  });

module.exports = router;