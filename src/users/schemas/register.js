import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(8).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
  passwordConfirmation: Joi.string().min(8).max(20).equal(Joi.ref('password')).required()
});
