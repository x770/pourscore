const router = require('express').Router();
const userRoutes = require('./users');
const beerRoutes = require('./beers');

router.use('/users', userRoutes);
router.use('/beers', beerRoutes);

module.exports = router;
