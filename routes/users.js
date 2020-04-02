const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { doesUserExists } = require('../middlewares/doesUserExists');
const { getUser, getUsers } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), doesUserExists, getUser);

module.exports = router;
