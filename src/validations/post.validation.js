const { Joi } = require('express-validation');

module.exports = {
  createPostValidation: {
    body: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      body: Joi.string().required(),
    }),
  },
  getPostValidation: {
    query: Joi.object({
      page: Joi.number(),
    })
  },
  editPostValidation: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
  deletePostValition: {
    params: Joi.object({
      id: Joi.string().required(),
    })
  }
};
