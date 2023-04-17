const Joi = require('joi');

const signUpSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
  status: Joi.string().required()
});

const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  signUpSchema, loginSchema
}
