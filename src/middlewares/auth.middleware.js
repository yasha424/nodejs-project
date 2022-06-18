import { verifyJwt } from '../common/verify.jwt.js';
import { HTTPError } from '../errors/http-error.class.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new HTTPError(403, 'No token provided'));
  }
  const token = authHeader.split(' ')[1];
  const type = authHeader.split(' ')[0];

  if (type !== 'Bearer' || !token) {
    return next(new HTTPError(403, 'Wrong token type'));
  }

  try {
    req.user = verifyJwt(token);
    return next();
  } catch (err) {
    return next(new HTTPError(403, err.message || 'Auth problem'));
  }
};
