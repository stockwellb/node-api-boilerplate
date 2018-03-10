const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const routes = require('./api/routes/index');
const {
  errorConverter,
  errorNotFound,
  error
} = require('./api/middlewares/error.middleware');
const logger = require('./api/middlewares/logger.middleware');

const app = express();

// parse body params into req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

app.use(methodOverride());

// Cross Origin Resource Sharing
app.use(cors());

// logging
app.use(logger);

// mount api routes
app.use('/', routes);

// if error is not an instanceOf APIError, convert it.
app.use(errorConverter);

// catch 404 and forward to error handler
app.use(errorNotFound);

// error handler, send stacktrace only during development
app.use(error);

module.exports = app;
