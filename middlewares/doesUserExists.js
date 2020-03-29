const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

module.exports.doesUserExists = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    req.user = user;
    next();
  })
    .catch(next);
};
