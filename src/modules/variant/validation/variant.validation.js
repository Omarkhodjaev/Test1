const joi = require("joi");

const variantScheme = joi.object({
  title: joi.string().max(1).min(1).required(),
  description: joi.string().max(20).required(),
  questionId: joi.number().required(),
  isCorrect: joi.boolean().required(),
});

const idSchema = joi.number().integer().positive().required();

module.exports = { variantScheme, idSchema };
