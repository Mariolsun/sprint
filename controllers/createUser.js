const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.createUser = (req, res) => {
  User.init().then(() => {
    const {
      name, about, avatar, email, password,
    } = req.body;
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, about, avatar, email, password: hash,
      }))
      .then((user) => {
        res.status(201).send({ _id: user._id, email: user.email });
      })
      .catch((err) => res.status(400).send({ message: err.message || 'Произошла ошибка' }));
  });
};
