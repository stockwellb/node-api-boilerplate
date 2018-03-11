const express = require('express');
const router = express.Router();
const listRoutes = require('./list.route');
const statusRoutes = require('./status.route');
const authController = require('../controllers/auth.controller');

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

// other routers
router.use('/status', statusRoutes);
router.use('/lists', listRoutes);

module.exports = router;
