const { RecordNotFoundError } = require('../errors');
const logger = require('../utils/logger')('service');
// noinspection Annotator
const List = require('../models').List;
const ListItem = require('../models').ListItem;
// noinspection Annotator

const add = data => {
  logger.trace(`Adding: ${JSON.stringify(data)}.`);
  return List.create({ name: data.name });
};

const get = id => {
  logger.trace(`Getting: ${id}.`);
  return List.findById(id, {
    include: [
      {
        model: ListItem,
        as: 'listItems'
      }
    ]
  }).then(list => {
    if (!list) {
      throw new RecordNotFoundError({
        message: 'List not found.'
      });
    }
    return list;
  });
};

const update = (id, data) => {
  logger.trace(`Updating: ${id}.`);
  return List.findById(id, {
    include: [
      {
        model: ListItem,
        as: 'listItems'
      }
    ]
  }).then(list => {
    if (!list) {
      throw new RecordNotFoundError({
        message: 'List not found.'
      });
    }
    return list.update({
      name: data.name || list.name
    });
  });
};

const remove = id => {
  logger.trace(`Removing: ${id}.`);
  return List.findById(id).then(list => {
    if (!list) {
      throw new RecordNotFoundError({
        message: 'List not found.'
      });
    }
    return list.destroy();
  });
};

const count = () => {
  logger.trace('Count.');
  return List.count();
};

const list = (offset, limit) => {
  logger.trace(`Listing all.`);
  return List.findAll({
    offset,
    limit,
    include: [
      {
        model: ListItem,
        as: 'listItems'
      }
    ],
    order: [['id', 'ASC'], [{ model: ListItem, as: 'listItems' }, 'id', 'ASC']]
  });
};

module.exports = {
  add,
  get,
  update,
  remove,
  list,
  count
};
