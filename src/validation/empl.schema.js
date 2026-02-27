const Joi = require("joi");

const createEmployee = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  courtesyTitle: Joi.string().min(3).max(4).required(),
  title: Joi.string().required(),
  city: Joi.string(),
  country: Joi.string(),
});

const updateEmployee = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  courtesyTitle: Joi.string().min(3).max(4),
  title: Joi.string(),
  birthDate: Joi.date(),
  hireDate: Joi.date(),
  address: Joi.string(),
  city: Joi.string(),
  region: Joi.string(),
  postalCode: Joi.string(),
  country: Joi.string(),
  phone: Joi.string().max(15),
  extention: Joi.number(),
  notes: Joi.string().max(500),
  reportsTo: Joi.number(),
});

module.exports = { createEmployee, updateEmployee };
