import Joi from 'joi';

export const updateSchema = Joi.object({
  name: Joi.string().min(8).max(40),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(20),
  passwordConfirmation: Joi.string().min(8).max(20).equal(Joi.ref('password'))
})
  .with('password', 'passwordConfirmation')
  .or('name', 'email', 'password');
