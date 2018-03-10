const express = require('express');
// noinspection NpmUsedModulesInstalled
const validate = require('express-validation');
const controller = require('../controllers/list.controller');
const itemRoutes = require('./list-item.route');
const paginate = require('express-paginate');
const authenticate = require('../middlewares/auth.middleware');
const { get, list, add, update } = require('../validations/list.validation');
const { max, maxLimit } = require('../../config/config').pagination;

const router = express.Router();

router.use('/:id/items', itemRoutes);

router.param('id', function(req, res, next, id) {
  // noinspection JSUndefinedPropertyAssignment
  req.id = id;
  next();
});

router.use('/', paginate.middleware(max, maxLimit));

router
  .route('/')
  .get(authenticate, validate(list), controller.list)
  .post(authenticate, validate(add), controller.add);

router
  .route('/:id')
  .get(authenticate, validate(get), controller.get)
  .patch(authenticate, validate(update), controller.update)
  .delete(authenticate, controller.remove);

module.exports = router;
