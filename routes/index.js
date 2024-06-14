const { Router } = require('express');
const { signup, signin, signout } = require('../controllers/usersUtils');

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);

module.exports = {
  router
}