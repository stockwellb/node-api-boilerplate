const express = require('express');
// noinspection NpmUsedModulesInstalled
const validate = require('express-validation');
const paginate = require('express-paginate');
const { max, maxLimit } = require('../../config/config').pagination;
const controller = require('../controllers/list-item.controller');
const {
  get,
  list,
  add,
  update
} = require('../validations/list-item.validation');

const router = express.Router({ mergeParams: true });

router.param('listItemId', function(req, res, next, id) {
  // noinspection JSUndefinedPropertyAssignment
  req.listItemId = id;
  next();
});

router.use('/', paginate.middleware(max, maxLimit));

router
  .route('/')
  .get(validate(list), controller.list)
  .post(validate(add), controller.add);

router
  .route('/:listItemId')
  .get(validate(get), controller.get)
  .patch(validate(update), controller.update)
  .delete(controller.remove);

module.exports = router;
