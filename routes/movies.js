const router = require('express').Router();

const { validateMoviePost, validateMovieId } = require('../middlewares/validate');

const {
  getMovie,
  postMovie,
  deleteMovie,
} = require('../controllers/movie');

router.get('/', getMovie);
router.post('/', validateMoviePost, postMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
