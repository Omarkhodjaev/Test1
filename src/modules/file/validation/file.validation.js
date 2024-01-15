const joi = require("joi");

const fileScheme = joi.object({
  media: joi.required(),
});

module.exports = { fileScheme };
