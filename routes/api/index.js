const router = require('express').Router();
const usersRoutes = require('./users');
const beersRoutes = require('./beers');
const signupRoute = require('./signup');
const loginRoute = require('./login');
const listsRoutes = require('./lists');

router.use('/users', usersRoutes);
router.use('/beers', beersRoutes);
router.use('/signup', signupRoute);
router.use('/login', loginRoute);
router.use('/lists', listsRoutes);

module.exports = router;
