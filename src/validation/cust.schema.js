const Joi = require("joi");

const idValidation = Joi.object({
  id: Joi.string().length(5).uppercase().required(),
});

const queryValidation = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(10).max(50),
});

const createCustomerValidation = Joi.object({
  customerId: Joi.string().trim().length(5).uppercase().required(),
  companyName: Joi.string().trim().min(2).max(40).required(),
  contactName: Joi.string().trim().min(5).max(30).required(),
});

const updateCustomerValidation = Joi.object({
  companyName: Joi.string().trim().min(2).max(40),
  contactName: Joi.string().trim().min(5).max(30),
  contactTitle: Joi.string().trim().min(5).max(30),
  address: Joi.string().trim().max(60),
  city: Joi.string().trim().max(30),
  region: Joi.string().trim().max(30),
  postalCode: Joi.string().trim().min(3).max(10),
  country: Joi.string().trim().min(2).max(30),
  phone: Joi.string().trim().min(3).max(24),
  fax: Joi.string().trim().max(24),
});

module.exports = {
  idValidation,
  queryValidation,
  createCustomerValidation,
  updateCustomerValidation,
};
