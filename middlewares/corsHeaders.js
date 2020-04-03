const jwt = require('jsonwebtoken');
const allowedCors = [
  'https://mesto.website',
  'http://mesto.website',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  next();
};
