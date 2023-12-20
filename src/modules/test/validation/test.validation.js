const joi = require("joi");

const testScheme = joi.object({
  title: joi.string().min(3).max(100).required(),
});

const idSchema = joi.number().integer().positive().required();

module.exports = { testScheme, idSchema };
