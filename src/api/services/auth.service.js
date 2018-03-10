const logger = require('../utils/logger')('service');
// noinspection Annotator
const User = require('../models').User;

const register = data => {
  logger.trace(`Adding: ${JSON.stringify(data)}.`);
  return User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password
  });
};

module.exports = {
  register
};
