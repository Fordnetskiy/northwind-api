const Joi = require("joi");

const idValidation = Joi.object({
  id: Joi.string().length(5).uppercase().required(),
}).options({ convert: false });

module.exports = { idValidation };
