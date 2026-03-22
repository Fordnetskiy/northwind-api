const Joi = require("joi");

const createCtgSchema = Joi.object({
  categoryName: Joi.string().required(),
  description: Joi.string().required(),
});
const updateCtgSchema = Joi.object({
  categoryName: Joi.string(),
  description: Joi.string(),
});

module.exports = { createCtgSchema, updateCtgSchema };
