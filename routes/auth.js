const express = require('express');
const router = express.Router();

const {
  getSignupValidationRules,
  getLoginValidationRules,
  validateUser
} = require('../middlewares/validator');
const authController = require('../controllers/auth.controllers');

router.post('/signup', getSignupValidationRules(), validateUser, authController.signup);

router.post('/login', getLoginValidationRules(), validateUser, authController.login);

module.exports = router;

