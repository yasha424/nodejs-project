import Joi from 'joi';

export const updateSchema = Joi.object({
  name: Joi.string().valid('user', 'admin').required()
});
