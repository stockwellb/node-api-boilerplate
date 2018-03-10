const logger = require('../utils/logger')('middleware');
const userService = require('../services/user.service');
const config = require('../../config/config').auth;
const { AuthenticationError } = require('../errors');
const jwt = require('jsonwebtoken');

const handler = (req, res, next) => {
  logger.trace('Authentication handler.');
  const token = req.headers['x-access-token'];
  logger.trace(`Received: {token: ${token}}`);
  if (!token) {
    throw new AuthenticationError({ message: 'No token provided' });
  }

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      throw new AuthenticationError({
        message: 'Failed to authenticate token.'
      });
    }
    logger.trace(`Decoded: {token: ${JSON.stringify(decoded)}}`);
    userService.get(decoded.id).then(user => {
      res.locals.user = user;
      next();
    });
  });
};

module.exports = handler;
