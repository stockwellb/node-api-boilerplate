const httpStatus = require('http-status');
const ListService = require('../services/list.service');
const { setPaginationHeaders } = require('../utils/pagination');

const add = (req, res, next) => {
  ListService.add(req.body)
    .then(list =>
      res
        .status(httpStatus.CREATED)
        .json(list)
        .end()
    )
    .catch(err => next(err, req, res));
};

const get = (req, res, next) => {
  ListService.get(req.id)
    .then(list => {
      res
        .status(httpStatus.OK)
        .json(list)
        .end();
    })
    .catch(err => {
      next(err, req, res);
    });
};

const update = (req, res, next) => {
  ListService.update(req.id, req.body)
    .then(list => {
      res
        .status(httpStatus.OK)
        .json(list)
        .end();
    })
    .catch(err => next(err, req, res));
};

const remove = (req, res, next) => {
  ListService.remove(req.id)
    .then(() => {
      res.status(httpStatus.NO_CONTENT).end();
    })
    .catch(err => next(err, req, res));
};

const list = (req, res, next) => {
  Promise.all([
    ListService.list(req.skip, req.query.limit),
    ListService.count()
  ])
    .then(([lists, count]) => {
      setPaginationHeaders(req, res, count);
      res
        .status(httpStatus.OK)
        .json(lists)
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
