const router = require('express').Router();
const userRoutes = require('./users');
const beerRoutes = require('./beers');
const signupRoute = require('./signup');
const loginRoute = require('./login');

router.use('/users', userRoutes);
router.use('/beers', beerRoutes);
router.use('/signup', signupRoute);
router.use('/login', loginRoute);

module.exports = router;
