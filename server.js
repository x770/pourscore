const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const PORT = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(bodyParser.json());

// Serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pourscoreDB', {
  useNewUrlParser: true,
  useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log('Connected to the database...')
});

// JWT middleware
app.use('/api', expressJwt({ secret: process.env.SECRET }));
app.use("/api/beer", require("./routes/beer.js"));
app.use("/auth", require("./routes/auth.js"));

// Start API server
app.listen(PORT, function() {
  console.log(`Server now listening on PORT ${PORT}...`);
});