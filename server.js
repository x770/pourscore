const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

const routes = require('./routes');
const PORT = process.env.PORT || 4000;

const app = express();


// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.use(session({
  secret: 'rocket-chasm-2948fdan312a',
  resave: true,
  saveUninitialized: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pourscoreDB', {
  useNewUrlParser: true
});

// Serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static(path.join(__dirname, 'client/build')));
}

// Start API server
app.listen(PORT, function() {
  console.log(`Server now listening on PORT ${PORT}...`);
});