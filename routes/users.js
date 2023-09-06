const router = require('express').Router();

const {
  validateUserInfoUpdate,
} = require('../middlewares/validate');

const {
  getCurrentUserInfo,
  updateUserInfo,
} = require('../controllers/users');

router.get('/me', getCurrentUserInfo);
router.patch('/me', validateUserInfoUpdate, updateUserInfo);

module.exports = router;
