
const jwt = require('jsonwebtoken');
const NeedAuthError = require('../errors/need-auth-err');
const { JWT_SECRET } = require('../config');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }
  console.log(`auth.js ${JSON.stringify(req.method)}`);
  const { authorization } = req.headers;
  console.log(`token: ${authorization}`);
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (authorization && authorization.startsWith('Bearer ')) {
    token = authorization.replace('Bearer ', '');
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new NeedAuthError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
