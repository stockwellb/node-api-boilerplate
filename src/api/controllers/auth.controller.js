const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/config').auth;

const authService = require('../services/auth.service');

const register = (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  authService
    .register(Object.assign(req.body, { password: hashedPassword }))
    .then(user => {
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res
        .status(httpStatus.CREATED)
        .json({ auth: true, token: token })
        .end();
    })
    .catch(err => next(err, req, res));
};

module.exports = {
  register
};
