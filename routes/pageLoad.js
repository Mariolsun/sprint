const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { pageLoad } = require('../controllers/pageLoad');
const { JWT_SECRET } = require('../config');
const NeedAuthError = require('../errors/need-auth-err');

router.get('/', (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }
  console.log(`auth.js ${JSON.stringify(req.method)}`);
  const { authorization } = req.headers;
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (authorization && authorization.startsWith('Bearer ')) {
    console.log(`token bearer`);
    token = authorization.replace('Bearer ', '');
  }
  let payload;
  console.log(`token: ${!!token}, ${token}`);
  if (token) {
    console.log('there is a token');
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new NeedAuthError('Ошибка авторизации'));
    }
  } else {
    console.log('no token');
  }
  req.user = payload;
  console.log(`sending result to pageload controller ${req.user}`);
  next();
}, pageLoad);

module.exports = router;
