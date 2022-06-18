import Joi from 'joi';

export const updateSchema = Joi.object({
  name: Joi.string().required()
});
