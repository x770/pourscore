const router = require('express').Router();
const db = require('../../models');

router.route('/')
  .post(function (req, res) {
    db.List.create({
      name: req.body.name,
      user: req.body.user,
      beers: req.body.beers
    }).then(function (data) {
      res.json(data)
    }).catch(err => {
      console.log(err);
      res.json(err)
    })
  });

router.route('/:listId')
  .get(function (req, res) {
    db.List.find({
      _id: req.params.listId
    }).then(data => {
      return res.json(data)
    }).catch(err => {
      res.json(err)
    })
  })
  .put(function (req, res) {
    db.List.findOneAndUpdate({ _id: req.params.listId }, req.body)
      .then(data => { return res.json(data) })
      .catch(err => {res.json(err)})
  })
  .delete(function (req, res) {
    db.List.findByIdAndRemove({ _id: req.params.listId })
      .then(function (data) {
        return res.json(data);
      })
      .catch(err => { res.json(err) })
  })

router.route('/user/:userId')
  .get(function (req, res) {
    db.List.find({
      user: req.params.userId
    }).then(function (data) {
      return res.json(data)
    }).catch(err => {
      res.json(err);
    })
  });

module.exports = router;