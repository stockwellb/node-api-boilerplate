'use strict';
const records = require('../../data').records;
const List = require('../models').list;
const ListItem = require('../models').list_item;

// noinspection JSUnusedLocalSymbols
module.exports = {
  up: (queryInterface, Sequelize) => {
    return List.sequelize.transaction(t => {
      const promises = records.map(record => {
        return List.create(
          record,
          {
            include: {
              model: ListItem,
              as: 'listItems'
            }
          },
          { transaction: t }
        );
      });

      return Promise.all(promises);
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('lists');
  }
};
