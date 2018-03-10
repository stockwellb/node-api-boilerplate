const express = require('express');
const router = express.Router();
const listRoutes = require('./list.route');
const statusRoutes = require('./status.route');
const authRoutes = require('./auth.route');

// noinspection JSUnusedLocalSymbols
redirect = (req, res, next) => {
  res.redirect('/status');
};

router.use('/status', statusRoutes);
router.use('/register', authRoutes);
router.use('/lists', listRoutes);

router
  .route('/')
  .get(redirect)
  .head(redirect);

module.exports = router;
