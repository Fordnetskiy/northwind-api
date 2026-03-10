const Joi = require("joi");

const idValidation = Joi.object({
  id: Joi.string().length(5).uppercase(),
}).options({ convert: false });

const queryValidation = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(10).max(50),
});

const createCustomerValidation = Joi.object({
  customerId: Joi.string().trim().length(5).uppercase().required(),
  companyName: Joi.string().trim().min(2).max(40).required(),
  contactName: Joi.string().trim().min(5).max(30).required(),
});

module.exports = { idValidation, queryValidation, createCustomerValidation };
