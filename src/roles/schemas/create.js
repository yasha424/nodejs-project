import Joi from 'joi';

export const createSchema = Joi.object({
  name: Joi.string().valid('user', 'admin').required()
});
