import { HTTPError } from '../errors/http-error.class.js';

export const validationMiddleware = function (schema) {
  return async function (req, res, next) {
    try {
      const validated = await schema.validateAsync(req.body);
      req.body = validated;
      return next();
    } catch (err) {
      if (err.isJoi) return next(new HTTPError(422, err.message));
      return next(new HTTPError(500));
    }
  };
};
