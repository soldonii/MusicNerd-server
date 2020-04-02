const express = require('express');
const router = express.Router();

const { userValidationRules, validateUser } = require('../middlewares/validator');
const authController = require('../controllers/auth.controllers');

router.post('/signup', userValidationRules(), validateUser, authController.signup);

module.exports = router;

