const User = require('../models/user');
const NeedAuthError = require('../errors/need-auth-err');

module.exports.pageLoad = (req, res, next) => {
  const { _id } = req.user;
  User.exists({ _id })
    .then((user) => {
      if (user) res.send({ data: req.user });
      else throw new NeedAuthError('Необходима авторизация');
    })
    .catch(next);
};
