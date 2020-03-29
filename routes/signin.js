const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/login');

console.log('signin.js');
router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);

module.exports = router;
