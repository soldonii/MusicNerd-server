const express = require('express');

const {
  getSignupValidationRules,
  getLoginValidationRules,
  validateUser
} = require('../middlewares/validator');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', getSignupValidationRules(), validateUser, authController.signup);

// router.post('/login', getLoginValidationRules(), validateUser, authController.saveArtistsAndTracks, authController.login);

router.post('/login', getLoginValidationRules(), validateUser, authController.login);

router.post('/logout', validateUser, authController.logout);

module.exports = router;
