const joi = require("joi");

const user_test_passedScheme = joi.object({
  testId: joi.number().required(),
  userId: joi.number().required(),
  totalQuestion: joi.number().required(),
  passedQuestion: joi.number().required(),
});

const idSchema = joi.number().integer().positive().required();

module.exports = { user_test_passedScheme, idSchema };

