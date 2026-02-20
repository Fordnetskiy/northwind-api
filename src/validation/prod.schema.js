const Joi = require("joi");

const createProdSchema = Joi.object({
  productId: Joi.number().required(),
  productName: Joi.string().min(3).max(40).required(),
  supplierId: Joi.number(),
  categoryId: Joi.number(),
});

const updateProdSchema = Joi.object({
  productName: Joi.string().min(3).max(40).required(),
  supplierId: Joi.number(),
  categoryId: Joi.number(),
  unitPrice: Joi.number(),
  unitsInStock: Joi.number(),
});

module.exports = { createProdSchema, updateProdSchema };
