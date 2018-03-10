const Joi = require('joi');

module.exports = {
  // GET /lists/:id/items/:listItemId
  get: {
    params: {
      id: Joi.number()
        .integer()
        .required(),
      listItemId: Joi.number()
        .integer()
        .required()
    }
  },

  // GET /lists/:id/items
  list: {
    query: {
      page: Joi.number().min(1),
      limit: Joi.number()
        .min(1)
        .max(100)
    }
  },

  // POST /lists/:id/items
  add: {
    body: {
      content: Joi.string().required()
    }
  },

  // PATCH /lists/:id/items/:listItemId
  update: {
    body: {
      content: Joi.string().required()
    },
    params: {
      id: Joi.number()
        .integer()
        .required(),
      listItemId: Joi.number()
        .integer()
        .required()
    }
  }
};
