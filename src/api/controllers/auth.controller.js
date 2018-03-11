const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/config').auth;

const authService = require('../services/auth.service');
const userService = require('../services/user.service');

const register = (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  authService
    .register(Object.assign(req.body, { password: hashedPassword }))
    .then(user => {
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.expiresIn
      });
      res
        .status(httpStatus.CREATED)
        .json({ auth: true, token: token })
        .end();
    })
    .catch(err => next(err, req, res));
};

const login = (req, res, next) => {
  userService.getByEmail(req.body.email).then(user => {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.expiresIn
      });
      res
        .status(httpStatus.OK)
        .json({ auth: true, token: token })
        .end();
    } else {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ auth: false, token: null })
        .end();
    }
  });
};

module.exports = {
  register,
  login
};
