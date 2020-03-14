const router = require('express').Router();
const { doesUserExists } = require('../middlewares/doesUserExists');
const { getUser, getUsers } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', doesUserExists, getUser);

module.exports = router;
