const Joi = require("joi");

const createSuppSchema = Joi.object({
  supplierId: Joi.number().required(),
  companyName: Joi.string().min(10).max(40).required(),
  contactName: Joi.string().max(30),
  contactTitle: Joi.string().max(30),
  address: Joi.string().max(60),
  city: Joi.string().min(2).max(20),
  postalCode: Joi.string().max(10),
  country: Joi.string().min(3).max(15),
  phone: Joi.string().max(24),
});

const updateSuppSchema = Joi.object({
  companyName: Joi.string().min(10).max(40).required(),
  contactName: Joi.string().max(30),
  contactTitle: Joi.string().max(30),
  address: Joi.string().max(60),
  city: Joi.string().min(2).max(20),
  region: Joi.string().max(15),
  postalCode: Joi.string().max(10),
  country: Joi.string().min(3).max(15),
  phone: Joi.string().max(24),
  fax: Joi.string().max(24),
  homepage: Joi.string(),
});

module.exports = { createSuppSchema, updateSuppSchema };
