const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');

module.exports.createUser = (req, res, next) => {
  const { email } = req.body;
  User.exists({ email })
    .then((exists) => {
      if (exists) throw new BadRequestError('Пользователь с таким email уже существует');
    })
    .then(() => {
      const { password } = req.body;
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      const {
        name, about, avatar,
      } = req.body;
      return User.create({
        name, about, avatar, email, password: hash,
      });
    })
    .then((user) => {
      res.status(201).send({ _id: user._id, email: user.email });
    })
    .catch((err) => {
      console.log(`error creating user! ${err.name}`);
      if (err.name === 'ValidationError') next(new BadRequestError(err.message));
      else next(err);
    });
};
