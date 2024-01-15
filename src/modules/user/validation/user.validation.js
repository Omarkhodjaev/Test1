const joi = require("joi");

const userScheme = joi.object({
  login: joi.string().min(1).max(10).required(),
  password: joi.string().min(6).required(),
  full_name: joi.string(),
  birth_date: joi.string(),
});

const userRegisterScheme = joi.object({
  login: joi.string().min(1).max(10).required(),
  password: joi.string().min(6).required(),
  role: joi.string().required(),
  birthdate: joi.string().required(),
  fullName: joi.string().required(),
  fileId: joi.string().required(),
});

module.exports = { userScheme, userRegisterScheme };
