const joi = require("joi");

const test_questScheme = joi.object({
  testId: joi.number().required(),
  questId: joi.number().required()
});

const idSchema = joi.number().integer().positive().required();

module.exports = { test_questScheme, idSchema };
