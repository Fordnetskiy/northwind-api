const Joi = require("joi");

const createShipperSchema = Joi.object({
  companyName: Joi.string().min(5).max(40).required(),
  phone: Joi.string().min(3).max(15),
});

const updateShipperSchema = Joi.object({
  companyName: Joi.string().min(5).max(40),
  phone: Joi.string().min(3).max(15),
});

module.exports = { createShipperSchema, updateShipperSchema };
