const logger = require('../utils/logger')('middleware');

const handler = (req, res, next) => {
  logger.trace(
    `(${req.method}) ${req.hostname}${req.url} ${
      isEmpty(req.body) ? '' : JSON.stringify(req.body)
    }`
  );
  next();
};

const isEmpty = obj => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

module.exports = handler;
