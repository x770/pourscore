const router = require('express').Router();
const db = require('../../models');

router.route('/')
  .post(function (req, res) {
    db.List.create({
      name: req.body.name,
      user: req.body.user
    }).then(function (data) {
      res.json(data)
    }).catch(err => {
      console.log(err);
      res.json(err)
    })
  });

router.route('/:userId')
  .get(function (req, res) {
    db.List.find({
      user: req.params.userId
    }).sort({
      date: -1
    }).then(function (data) {
      return res.json(data)
    }).catch(err => {
      res.json(err);
    })
  });

module.exports = router;