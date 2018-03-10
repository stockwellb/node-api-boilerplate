const express = require('express');
const router = express.Router();
const controller = require('../controllers/status.controller');

router.route('/').get(controller.get);

module.exports = router;
