const logger = require('../utils/logger')('middleware');
const userService = require('../services/user.service');
const config = require('../../config/config').auth;
const { AuthenticationError } = require('../errors');
const jwt = require('jsonwebtoken');

const handler = (req, res, next) => {
  logger.trace('Authentication handler.');
  if (req.headers && req.headers.authorization) {
    const authorization = req.headers.authorization;
    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
      throw new AuthenticationError({
        message: `${type} authorization not supported.`
      });
    }

    logger.trace(`Received: {token: ${token}}.`);
    if (!token) {
      throw new AuthenticationError({ message: 'No token provided.' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        throw new AuthenticationError({
          message: 'Failed to authenticate token.'
        });
      }
      logger.trace(`Decoded: {token: ${JSON.stringify(decoded)}}.`);
      userService.get(decoded.id).then(user => {
        res.locals.user = user;
        next();
      });
    });
  } else {
    throw new AuthenticationError({ message: 'No token provided.' });
  }
};

module.exports = handler;
