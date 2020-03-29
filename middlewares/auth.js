
const jwt = require('jsonwebtoken');
const NeedAuthError = require('../errors/need-auth-err');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(`auth. req : ${JSON.stringify(req.cookies)}`);
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (authorization && authorization.startsWith('Bearer ')) {
    token = authorization.replace('Bearer ', '');
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(`unsuccesful auth`);
    next(new NeedAuthError('Необходима авторизация'));
  }
  console.log(`succesful auth`);
  req.user = payload;

  next();
};
