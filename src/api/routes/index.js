const express = require('express');
const router = express.Router();
const listRoutes = require('./list.route');
const statusRoutes = require('./status.route');

// noinspection JSUnusedLocalSymbols
redirect = (req, res, next) => {
  res.redirect('/status');
};

router.use('/status', statusRoutes);
router.use('/lists', listRoutes);

router
  .route('/')
  .get(redirect)
  .head(redirect);

module.exports = router;
