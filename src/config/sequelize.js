const { database } = require('./config.js');

module.exports = {
  username: database.username,
  password: database.password,
  database: database.name,
  host: database.host,
  port: database.port,
  dialect: database.dialect,
  operatorsAliases: database.operatorsAliases
};
