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

const getByEmail = email => {
  logger.trace(`Getting: ${email}.`);
  return User.findAll({ where: { email: email } }).then(users => {
    if (users.length === 0) {
      throw new RecordNotFoundError({
        message: 'User not found.'
      });
    }
    return users[0];
  });
};

module.exports = {
  get,
  getByEmail
};
