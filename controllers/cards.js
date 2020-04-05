const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');

module.exports.createCard = (req, res, next) => {
  const {
    name, link,
  } = req.body;
  if (!req.user) console.log('cards controller didnt recieve req.user!');
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


module.exports.likeCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((likedCard) => {
      if (!likedCard) {
        throw new NotFoundError('Такой карточки нет в базе');
      }
      const index = likedCard.likes.indexOf(req.user._id);
      if (index >= 0) {
        likedCard.likes.slice(index, 1);
      } else {
        likedCard.likes.push(req.user._id);
      }
      res.send({ data: likedCard });
    })
    .catch(next);
};
