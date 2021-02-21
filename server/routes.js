const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/')
    .get(controller.get)
    .post(controller.post)

router
  .route('/t')
    .get(controller.getTypes)

router
  .route('/:id')
    .patch(controller.rename)
    .delete(controller.delete)


module.exports = router