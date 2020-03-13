const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.createUser = (req, res) => {
  console.log(`creating user req: ${req.body}`);
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message || 'Произошла ошибка' }));
};
