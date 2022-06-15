import Joi from 'joi';

export const updateSchema = Joi.object({
  latitude: Joi.number().min(-90).max(90),
  longitude: Joi.number().min(-180).max(180),
  datetime: Joi.date().greater('1-1-1970'),
  description: Joi.string().max(200).min(10).required()
});
