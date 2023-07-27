const router = require('express').Router();

const { validateMoviePost, validateMovieId } = require('../middlewares/validate');

const {
  getMovie,
  postMovie,
  deleteMovie,
} = require('../controllers/movie');

router.get('/movies', getMovie);
router.post('/movies', validateMoviePost, postMovie);
router.delete('/movies/_id', validateMovieId, deleteMovie);

module.exports = router;
