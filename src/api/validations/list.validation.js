const Joi = require('joi');

module.exports = {
  // GET /lists/:id
  get: {
    params: {
      id: Joi.number()
        .integer()
        .required()
    }
  },

  // GET /lists
  list: {
    query: {
      page: Joi.number().min(1),
      limit: Joi.number()
        .min(1)
        .max(100)
    }
  },

  // POST /lists
  add: {
    body: {
      name: Joi.string().required()
    }
  },

  // PATCH /lists/:id
  update: {
    body: {
      name: Joi.string().required()
    },
    params: {
      id: Joi.number().required()
    }
  }
};
