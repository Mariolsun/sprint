const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.createCard = (req, res, next) => {
  const {
    name, link,
  } = req.body;
  Card.create({
    name, link, owner: req.user._id,
  })
    .then((card) => {
      if (!card) {
        throw new BadRequestError('Ошибка создания арточки');
      }
      Card.findById(card._id) // находим новую карточку, чтобы ответ был с инфой про ее создателя
        .populate('owner')
        .then((item) => {
          if (!item) {
            console.log(`throwing 404`);
            throw new BadRequestError('Ошибка создания арточки');
          }
          console.log(`card created`);
          res.send({ data: item });
        })
        .catch(next);
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
    .then((DeletedCard) => {
      if (!DeletedCard) {
        throw new NotFoundError('Такой карточки нет в базе');
      }
      res.send({ message: `Карточка ${DeletedCard.name} удалена` });
    })
    .catch(next);
};
