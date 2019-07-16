const router = require('express').Router();
const db = require('../../models');

router.route('/')
  .post(function (req, res) {
    db.Beer.create({
      user: req.body.user,
      beerName: req.body.beerName,
      breweryName: req.body.breweryName,
      beerRating: req.body.beerRating,
      beerNotes: req.body.beerNotes
    }).then(function (data) {
      res.json(data)
    }).catch(err => {
      console.log(err);
      res.json(err)
    })
  });

router.route('/:beerId')
  .get(function (req, res) {
    db.Beer.find({
      _id: req.params.beerId
    }).then(function (data) {
      return res.json(data)
    }).catch(err => {
      res.json(err);
    })
  })
  .delete(function (req, res) {
    db.Beer.deleteOne({
      _id: req.params.beerId
    }).then(function (data) {
      return res.json(data)
    }).catch(err => {
      res.json(err);
    })
  })

router.route('/user/:userId')
  .get(function (req, res) {
    db.Beer.find({
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