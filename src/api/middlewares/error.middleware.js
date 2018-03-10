const httpStatus = require('http-status');
// noinspection NpmUsedModulesInstalled
const expressValidation = require('express-validation');
const APIError = require('../utils/APIError');
const logger = require('../utils/logger')('middleware');
const { env } = require('../../config/config.js');

const handler = (err, req, res) => {
  logger.trace('Error handler.');
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack
  };

  if (env !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
  res.end();
};

const converter = (err, req, res, next) => {
  logger.trace('Error conversion handler.');

  let convertedError = err;

  if (err instanceof expressValidation.ValidationError) {
    convertedError = new APIError({
      message: 'Validation error.',
      errors: err.errors,
      status: err.status,
      stack: err.stack
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack
    });
  }

  return handler(convertedError, req, res, next);
};

const notFound = (req, res, next) => {
  logger.trace('Error not found handler.');

  const err = new APIError({
    message: 'Not found.',
    status: httpStatus.NOT_FOUND
  });
  return handler(err, req, res, next);
};

module.exports = {
  errorConverter: converter,
  errorNotFound: notFound,
  error: handler
};
