const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { checkOwner } = require('../middlewares/checkOwner');
const { doesCardExists } = require('../middlewares/doesCardExists');
const {
  createCard, getCard, getCards, deleteCard,
} = require('../controllers/cards');


router.get('/', getCards);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), doesCardExists, getCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}), createCard);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), doesCardExists, checkOwner, deleteCard);
module.exports = router;
