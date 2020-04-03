const User = require('../models/user');
const Card = require('../models/card');
const NeedAuthError = require('../errors/need-auth-err');

module.exports.pageLoad = (req, res, next) => {
  const { _id } = req.user;
  const data = {};

  User.exists({ _id })
    .then((user) => {
      if (!user) throw new NeedAuthError('Необходима авторизация');
      else {
        data.user = user;
        return Card.find({})
          .populate('owner');
      }
    })
    .then((cards) => {
      data.cards = cards;
      res.send({ data });
    })
    .catch(next);
};
