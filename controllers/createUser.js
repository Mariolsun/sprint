const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ConflictError = require('../errors/conflict-err');

module.exports.createUser = (req, res, next) => {
  const { email } = req.body;
  User.exists({ email })
    .then((exists) => {
      if (exists) throw new ConflictError('Пользователь с таким email уже существует');
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
    .catch(next);
};
