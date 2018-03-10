const APIError = require('../utils/APIError');
const httpStatus = require('http-status');

class AuthenticationError extends APIError {
  constructor({ message }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = httpStatus.UNAUTHORIZED;
  }
}

module.exports = AuthenticationError;
