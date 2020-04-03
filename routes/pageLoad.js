const router = require('express').Router();
const auth = require('../middlewares/auth');
const { pageLoad } = require('../controllers/pageLoad');

router.get('/', auth, pageLoad);

module.exports = router;
