const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { loginUser, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const ErrorNotFound = require('../errors/errorNotFound');
const { validateUserSingUp, validateUserSignIn } = require('../middlewares/validate');

router.post('/signup', validateUserSingUp, createUser);
router.post('/signin', validateUserSignIn, loginUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use('*', auth, (req, res, next) => {
  next(new ErrorNotFound('Маршрут не найден!'));
});

module.exports = router;
