const router = require('express').Router();
const usersController = require('../../controllers/user-controller');

router.route('/')
  .get(usersController.findAll);

module.exports = router;