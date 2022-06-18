import Joi from 'joi';

export const updateSchema = Joi.object({
  name: Joi.string().min(8).max(40),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(20),
  roleId: Joi.number().integer().min(1).max(2)
}).or('name', 'email', 'password', 'roleId');
