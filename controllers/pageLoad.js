const User = require('../models/user');
const Card = require('../models/card');

module.exports.pageLoad = (req, res, next) => {
  console.log('pageload controller');
  const data = {};

  return Card.find({})
    .populate('owner')
    .then((cards) => {
      data.cards = cards;
      if (req.user) {
        return User.findById(req.user._id)
          .then((user) => {
            if (user) data.user = user;
          });
      }
    })
    .then(() => {
      res.send({ user: data.user, cards: data.cards });
    })
    .catch(next);
};
