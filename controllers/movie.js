const Movie = require('../models/movie');

const ErrorBadRequest = require('../errors/errorBadRequest');
const ErrorForbidden = require('../errors/errorForbidden');
const ErrorNotFound = require('../errors/errorNotFound');

// Получение фильма
const getMovie = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .then((movie) => res.send(movie))
    .catch(next);
};

// Создание фильма
const postMovie = (req, res, next) => {
  const { _id } = req.user;

  Movie.create({ owner: _id, ...req.body })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new ErrorBadRequest(
            `Переданные данные фильма при создании некорректны: ${err}`,
          ),
        );
      } else {
        next(err);
      }
    });
};

// Удаление фильма
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => new ErrorNotFound('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        movie
          .deleteOne(movie)
          .then((movies) => res.send(movies))
          .catch(next);
      } else {
        throw new ErrorForbidden('Нельзя удалить чужой фильм');
      }
    })
    .catch(next);
};

module.exports = {
  getMovie, postMovie, deleteMovie,
};
