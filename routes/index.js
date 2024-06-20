const { Router } = require('express');
const { signup, signin, signout } = require('../controllers/usersUtils');
const { auth } = require('../middlewares/auth')
const { usersRouter } = require('./userRouter');

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);

router.use('/users', auth, usersRouter);

module.exports = {
  router
}