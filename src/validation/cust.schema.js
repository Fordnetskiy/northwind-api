const Joi = require("joi");

const idValidation = Joi.object({
  id: Joi.string().length(5).uppercase(),
}).options({ convert: false });

const queryValidation = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(10).max(50),
});

module.exports = { idValidation, queryValidation };
