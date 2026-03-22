const Joi = require("joi");

const createOrderSchema = Joi.object({
  customerId: Joi.string().required(),
  employeeId: Joi.number().required(),
  shipper: Joi.number().required(),
  freight: Joi.number().required(),
  address: Joi.string().min(10).max(60).required(),
  city: Joi.string().min(2).max(40).required(),
  country: Joi.string().min(3).max(30).required(),
  postalCode: Joi.string().required().min(5).max(12),
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
});

const createOrderSchemaMy = Joi.object({
  employeeId: Joi.number().required(),
  shipper: Joi.number().required(),
  freight: Joi.number().required(),
  address: Joi.string().min(10).max(60).required(),
  city: Joi.string().min(2).max(40).required(),
  country: Joi.string().min(3).max(30).required(),
  postalCode: Joi.string().required().min(5).max(12),
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
});

const updateOrderSchema = Joi.object({
  requiredDate: Joi.date(),
  shipper: Joi.number(),
  address: Joi.string().min(10).max(60),
  city: Joi.string().min(2).max(40),
  region: Joi.string().min(2).max(40),
  postalCode: Joi.number().min(5).max(12),
  country: Joi.string().min(3).max(30),
});

module.exports = { createOrderSchema, createOrderSchemaMy, updateOrderSchema };
