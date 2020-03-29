const Card = require('../models/card');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.checkOwner = (req, res, next) => {
  Card.findById(req.params.id, (err, card) => {
    if (card.owner.toString() !== req.user._id) {
      next(new ForbiddenError('Карточку может удалить только ее создатель!'));
    }
    next();
  })
    .catch(next);
};
