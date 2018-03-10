const httpStatus = require('http-status');

/**
 * @api {GET} /status get the api status.
 */
const get = (req, res) => {
  res.status(httpStatus.OK);
  res.json({ status: 'OK' }).end();
};

module.exports = {
  get
};
