const httpStatus = require('http-status');
const ListItemService = require('../services/list-item.service');
const { setPaginationHeaders } = require('../utils/pagination');

const add = (req, res, next) => {
  ListItemService.add(req.id, req.body)
    .then(listItem =>
      res
        .status(httpStatus.CREATED)
        .json(listItem)
        .end()
    )
    .catch(err => next(err, req, res));
};

const get = (req, res, next) => {
  ListItemService.get(req.id, req.listItemId)
    .then(listItem => {
      res
        .status(httpStatus.OK)
        .json(listItem)
        .end();
    })
    .catch(err => {
      next(err, req, res);
    });
};

const update = (req, res, next) => {
  ListItemService.update(req.listItemId, req.body)
    .then(listItem => {
      res
        .status(httpStatus.OK)
        .json(listItem)
        .end();
    })
    .catch(err => next(err, req, res));
};

const remove = (req, res, next) => {
  ListItemService.remove(req.listItemId)
    .then(() => {
      res.status(httpStatus.NO_CONTENT).end();
    })
    .catch(err => next(err, req, res));
};

const list = (req, res, next) => {
  Promise.all([
    ListItemService.list(req.id, req.skip, req.query.limit),
    ListItemService.count(req.id)
  ])
    .then(([listItems, count]) => {
      setPaginationHeaders(req, res, count);
      res
        .status(httpStatus.OK)
        .json(listItems)
        .end();
    })
    .catch(err => next(err, req, res));
};

module.exports = {
  add,
  get,
  update,
  remove,
  list
};
