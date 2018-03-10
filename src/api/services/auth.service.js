const logger = require('../utils/logger')('service');
// noinspection Annotator
const User = require('../models').User;
const { RecordExistsError } = require('../errors');

const register = data => {
  logger.trace(`Adding: ${JSON.stringify(data)}.`);
  return emailExists(data.email).then(exists => {
    if (exists) {
      throw new RecordExistsError({
        message: 'A user with this email already exists.'
      });
    } else {
      return User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      });
    }
  });
};

const emailExists = email => {
  return User.findAll({ where: { email } }).then(users => {
    return users.length > 0;
  });
};

module.exports = {
  register
};
