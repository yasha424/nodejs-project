import jwt from 'jsonwebtoken';
import { HTTPError } from '../errors/http-error.class.js';

export const verifyJwt = async function (token) {
  let res;
  await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      throw new HTTPError(403, 'Token expired');
    }
    res = user;
  });
  return res;
};

export const signJwt = async function (data) {
  const token = await jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30m'
  });
  return token;
};
