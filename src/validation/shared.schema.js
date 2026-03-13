const Joi = require("joi");

const numericIdValidation = Joi.object({
  id: Joi.number().integer().positive().required(),
});

module.exports = { numericIdValidation };
