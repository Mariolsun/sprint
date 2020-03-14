const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log(`searching for user: ${email} ${password}`);
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ message: 'Success!' });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: `err.messageee ${err.message}` });
    });
};
