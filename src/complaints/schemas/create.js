import Joi from 'joi';

export const createSchema = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  date: Joi.date().greater('1-1-1970').required(),
  description: Joi.string().max(200).min(10).required()
});
