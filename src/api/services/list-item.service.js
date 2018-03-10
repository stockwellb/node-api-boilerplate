const { RecordNotFoundError } = require('../errors');
const logger = require('../utils/logger')('service');
// noinspection Annotator
const ListItem = require('../models').list_item;
const List = require('../models').list;

const add = (id, data) => {
  logger.trace(`Adding: ${id}, ${JSON.stringify(data)}.`);
  return List.findById(id)
    .then(list => {
      if (!list) {
        throw new RecordNotFoundError({
          message: 'List not found.'
        });
      }
      return list;
    })
    .then(list => {
      return ListItem.create({
        listId: list.id,
        content: data.content
      });
    });
};

const get = (listId, id) => {
  logger.trace(`Getting: ${listId}-${id}.`);
  return List.findById(listId)
    .then(list => {
      if (!list) {
        throw new RecordNotFoundError({
          message: 'List not found.'
        });
      }
      return list;
    })
    .then(() => {
      return ListItem.findById(id).then(listItem => {
        if (!listItem) {
          throw new RecordNotFoundError({
            message: 'Item not found.'
          });
        }
        return listItem;
      });
    });
};

const update = (id, data) => {
  logger.trace(`Updating: ${id}.`);
  return ListItem.findById(id).then(listItem => {
    if (!listItem) {
      throw new RecordNotFoundError({
        message: 'Item not found.'
      });
    }
    return listItem.update({
      content: data.content || listItem.content
    });
  });
};

const remove = id => {
  logger.trace(`Removing: ${id}.`);
  return ListItem.findById(id).then(listItem => {
    if (!listItem) {
      throw new RecordNotFoundError({
        message: 'Item not found.'
      });
    }
    return listItem.destroy();
  });
};

const count = id => {
  logger.trace(`Count for: ${id}.`);
  return ListItem.count({ where: { listId: id } });
};

const list = (id, offset, limit) => {
  logger.trace(`Listing all: ${id}.`);
  return List.findById(id).then(list => {
    if (!list) {
      throw new RecordNotFoundError({
        message: 'Item not found.'
      });
    }
    return ListItem.findAll({
      where: { listId: id },
      offset,
      limit,
      order: [['id', 'ASC']]
    });
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
