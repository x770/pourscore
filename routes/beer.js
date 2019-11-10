const beerRouter = require('express').Router();
const Beer = require('../models/beer');

beerRouter.get("/", (req, res, next) => {
  Beer.find({ user: req.user._id, token: req.token }, (err, beers) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.send(beers);
  });
});

beerRouter.post("/", (req, res, next) => {
  const beer = new Beer(req.body);

  beer.user = req.user._id;
  beer.save(function (err, newBeer) {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(newBeer);
  });
});

beerRouter.get("/:beerId", (req, res, next) => {
  Beer.findOne({_id: req.params.beerId, user: req.user._id }, (err, beer) => {
    if (err) {
      res.status(500);
      return next(err);
    } else if (!beer) {
      res.status(404)
      return next(new Error("No beer found."));
    }
    return res.send(beer);
  });
});

beerRouter.put("/:beerId", (req, res, next) => {
  Beer.findOneAndUpdate(
    { _id: req.params.beerId, user: req.user._id },
    req.body,
    { new: true },
    (err, beer) => {
      if (err) {
        console.log("Error");
        res.status(500);
        return next(err);
      }
      return res.send(beer);
    }
  );
});

beerRouter.delete("/:beerId", (req, res, next) => {
  Beer.findOneAndRemove({ _id: req.params.beerId, user: req.user._id }, (err, beer) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.send(beer);
  });
});

module.exports = beerRouter;