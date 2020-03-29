const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { JWT_SECRET } = process.env;
      if (!JWT_SECRET) {
        throw new Error();
      }
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
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
