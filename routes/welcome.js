const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({ message: 'Welcome to mesto.website API! POST /signin to authorize' });
});

module.exports = router;
