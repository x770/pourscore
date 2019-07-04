const router = require('express').Router();
const usersController = require('../../controllers/usersController');

router.route('/')
  .post(function (req, res) {
    usersController.create({
      username: req.body.username,
      password: req.body.password
    });
  })

module.exports = router;