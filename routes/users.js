const router = require('express').Router();

const {
  validateUserInfoUpdate,
} = require('../middlewares/validate');

const {
  getCurrentUserInfo,
  updateUserInfo,
} = require('../controllers/users');

router.get('/users/me', getCurrentUserInfo);
router.patch('/users/me', validateUserInfoUpdate, updateUserInfo);

module.exports = router;
