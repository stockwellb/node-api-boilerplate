const APIError = require('../utils/APIError');
const httpStatus = require('http-status');

class RecordNotFoundError extends APIError {
  constructor({ message }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = httpStatus.NOT_FOUND;
  }
}

module.exports = RecordNotFoundError;
