const express = require("express")
const User = require("../models/user");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

// Signing up a new user
authRouter.post('/signup', (req, res, next) => {
  // Checking if the username already exists in the database
  User.findOne({ username: req.body.username }, (err, existingUser) => {
  
    if (err) {
      return (
        res
          .status(500)
          .send({ success: false, err })
      )
    }
    
    if (existingUser !== null) {
      return (
        res
          .status(400)
          .send({ success: false, err: "That username already exists!" })
      )
    }

    // Create a new user
    const newUser = new User(req.body);
    newUser.save((err, user) => {
      if (err) {
        res.status(500);
        return next(err);
      }

      // Assign token to user so an auto log in occurs
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
      return res.status(201).send({
        success: true,
        user: user.withoutPassword(),
        token
      });
    });
  });
});

// Logging in a user
authRouter.post('/login', (req, res, next) => {
  // Checking for user in the database
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    } else if (!user) {
      res.status(403);
      return next(new Error('Username or password are incorrect!'))
    }

    user.checkPassword(req.body.password, (err, match) => {
      if (err) return res.status(500).send(err);
      if (!match) return res.status(401).send({ message: 'Username or password is incorrect!' })
      
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET);

      return res.send({
        user: user.withoutPassword(),
        token
      })

    });
  });
});

module.exports = authRouter;