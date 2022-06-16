import jwt from 'jsonwebtoken';
import { HTTPError } from '../errors/http-error.class.js';

const verifyJwt = function (token) {
  let res;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      throw new HTTPError(403, 'Token expired');
    }
    res = user;
  });
  return res;
};

const signJwt = function (data) {
  const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30m'
  });
  return token;
};

export { verifyJwt, signJwt };
