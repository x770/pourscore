const router = require('express').Router();
const db = require('../../models');

router.route('/')
  .post(function (req, res) {
    db.Beer.create({
      user: req.body.user,
      lists: req.body.lists,
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
    const beerId = req.params.beerId;
    db.Beer.findByIdAndRemove({ _id: beerId })
      .exec(function (err, removed) {
        db.List.updateMany(
          { beers: { $in: beerId } },
          { $pull: { beers: beerId } },
          { new: true },
          function (err, removedFromList) {
            if (err) { console.log(err) }
            res.status(200).send(removedFromList)
          })
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