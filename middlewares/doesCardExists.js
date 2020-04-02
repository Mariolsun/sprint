const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');

module.exports.doesCardExists = (req, res, next) => {
  Card.findById(req.params.id, (err, card) => {
    if (!card) {
      next(new NotFoundError('Такой карточки нет в базе'));
    }
    next();
  })
    .catch(next);
};
