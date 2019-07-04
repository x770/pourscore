const passport = require('../../config/passport');
const router = require('express').Router();

router.route('/')
  .post(passport.authenticate('local'),
    function (req, res) {
    res.json('dashboard');
    }
)
  
module.exports = router;