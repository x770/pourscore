const router = require('express').Router();
const beersController = require('../../controllers/beersController');

router.route('/')
  .get(beersController.findAll)
  .post(beersController.create);

router.route('/:id')
  .get(beersController.findById)
  .put(beersController.update)
  .delete(beersController.remove);

module.exports = router;