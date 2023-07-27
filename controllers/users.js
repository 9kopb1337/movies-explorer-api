const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const JsonWebToken = require('jsonwebtoken');
const User = require('../models/user');

const ErrorBadRequest = require('../errors/errorBadRequest');
const ErrorNotFound = require('../errors/errorNotFound');
const ErrorConflict = require('../errors/errorConflict');
const ErrorServer = require('../errors/errorServerNoRespond');
const ErrorUnauthorized = require('../errors/errorUnauthorized');

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => new ErrorUnauthorized('Авторизация не прошла.'))
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((isValidaUser) => {
          if (!isValidaUser) {
            throw new ErrorUnauthorized('Переданы некорректные данные.');
          }
          const token = JsonWebToken.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '1d' });
          return res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send(user.toJSON()))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные.'));
      } else if (err.code === 11000) {
        next(new ErrorConflict('Такой e-mail уже занят.'));
      }
      next(err);
    });
};

const getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new ErrorNotFound('Пользователь не найден!'))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные.'));
      } else {
        next(new ErrorServer('Произошла ошибка сервера.'));
      }
    });
};

module.exports = {
  createUser,
  updateUserInfo,
  loginUser,
  getCurrentUserInfo,
};
