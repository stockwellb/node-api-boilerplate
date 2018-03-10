'use strict';
const logger = require('../utils/logger')('models');
const loggerDb = require('../utils/logger')('database');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { database } = require('../../config/config.js');
const db = {};

// add custom logger to sequelize output
database.logging = text => loggerDb.trace(text);

const sequelize = new Sequelize(
  database.name,
  database.username,
  database.password,
  database
);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    logger.trace(`Creating model: ${model.name}.`);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    logger.trace(`Associating model: ${modelName}.`);
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
