const express = require('express');

const {
  getSignupValidationRules,
  getLoginValidationRules,
  validateUser
} = require('../middlewares/validator');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', getSignupValidationRules(), validateUser, authController.signup);

// artists 및 tracks를 저장하는 middleware가 포함된 router. 필요할 때에만 사용.
// router.post('/login', getLoginValidationRules(), validateUser, authController.saveArtistsAndTracks, authController.login);

router.post('/login', getLoginValidationRules(), validateUser, authController.login);

module.exports = router;
