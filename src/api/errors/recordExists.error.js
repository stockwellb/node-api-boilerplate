const APIError = require('../utils/APIError');
const httpStatus = require('http-status');

class RecordExistsError extends APIError {
  constructor({ message }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = httpStatus.CONFLICT;
  }
}

module.exports = RecordExistsError;
