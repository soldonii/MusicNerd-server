const express = require('express');
const router = express.Router();

const {
  getSignupValidationRules,
  getLoginValidationRules,
  validateUser
} = require('../middlewares/validator');
const authController = require('../controllers/auth.controller');

router.post('/signup', getSignupValidationRules(), validateUser, authController.signup);

router.post('/login', getLoginValidationRules(), validateUser, authController.saveArtistsAndSongs, authController.login);

module.exports = router;

