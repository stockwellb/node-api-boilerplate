const { RecordNotFoundError } = require('../errors');
const logger = require('../utils/logger')('service');
// noinspection Annotator
const User = require('../models').User;
// noinspection Annotator

const get = id => {
  logger.trace(`Getting: ${id}.`);
  return User.findById(id).then(user => {
    if (!user) {
      throw new RecordNotFoundError({
        message: 'User not found.'
      });
    }
    return user;
  });
};

module.exports = {
  get
};
