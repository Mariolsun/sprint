const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');

module.exports.createCard = (req, res, next) => {
  const {
    name, link,
  } = req.body;
  Card.create({
    name, link, owner: req.user._id,
  })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('oopsie');
      }
      return Card.findById(card._id).populate('owner'); // находим нов. card, чтобы ответ был с инфой про ее создателя
    })
    .then((item) => {
      if (!item) {
        throw new NotFoundError('oopsie');
      }
      res.send({ data: item });
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.getCard = (req, res, next) => {
  Card.findById(req.params.id)
    .populate('owner')
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};


module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.id)
    .then((deletedCard) => {
      if (!deletedCard) {
        throw new NotFoundError('Такой карточки нет в базе');
      }
      res.send({ message: 'Карточка удалена', data: deletedCard });
    })
    .catch(next);
};
