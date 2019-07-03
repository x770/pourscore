const router = require('express').Router();
const beerController = require('../../controllers/beer-controller');

router.route('/')
  .get(beerController.findAll)
  .post(beerController.create);

router.route('/:id')
  .get(beerController.findById)
  .put(beerController.update)
  .delete(beerController.remove);

module.exports = router;