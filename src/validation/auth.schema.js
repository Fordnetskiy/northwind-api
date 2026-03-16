const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().max(255).lowercase().trim().required(),
  password: Joi.string().min(8).max(72).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(1).required(),
});

module.exports = { registerSchema, loginSchema };
