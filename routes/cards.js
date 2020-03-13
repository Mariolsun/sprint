const router = require('express').Router();
const { checkOwner } = require('../middlewares/checkOwner');
const { doesCardExists } = require('../middlewares/doesCardExists');
const {
  createCard, getCard, getCards, deleteCard,
} = require('../controllers/cards');


router.get('/', getCards);

router.get('/:id', doesCardExists, getCard);

router.post('/', createCard);

router.delete('/:id', doesCardExists, checkOwner, deleteCard);
module.exports = router;
