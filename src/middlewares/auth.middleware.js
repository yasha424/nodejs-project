import { verifyJwt } from '../common/verify.jwt.js';
import { HTTPError } from '../errors/http-error.class.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return next(new HTTPError(403, 'No token provided'));

  try {
    req.user = verifyJwt(token);
    return next();
  } catch (err) {
    return next(new HTTPError(403, err.message || 'Auth problem'));
  }
};
