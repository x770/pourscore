const express = require('express');
const session = require('express-session');

const mongoose = require('mongoose');
const passport = require('./config/passport');

const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 4000;

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Passport set up
app.use(session({ secret: 'rocket-chasm', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Require routes
app.use(routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pourscoreDB', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

// Start API server
app.listen(PORT, function() {
  console.log(`Server now listening on PORT ${PORT}...`);
});