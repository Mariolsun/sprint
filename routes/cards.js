const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { checkOwner } = require('../middlewares/checkOwner');
const { doesCardExists } = require('../middlewares/doesCardExists');
const {
  createCard, getCard, getCards, deleteCard, likeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');

router.get('/', getCards);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), doesCardExists, getCard);

router.put('/:id/like', auth, likeCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}), auth, createCard);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), auth, doesCardExists, checkOwner, deleteCard);
module.exports = router;
