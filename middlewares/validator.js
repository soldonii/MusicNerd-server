const { body, validationResult } = require('express-validator');

const validationErrorMessages = {
  USERNAME: 'Username should be lowercase.',
  EMAIL: 'Invalid email address.',
  PASSWORD: 'Password should be longer than 6 characters.',
  PASSWORD_CONFIRMATION: 'Password does not match.'
};

const getSignupValidationRules = () => [
  body('username', validationErrorMessages.USERNAME).exists().isLowercase(),
  body('email', validationErrorMessages.EMAIL).exists().isEmail(),
  body('password', validationErrorMessages.PASSWORD).exists().isLength({ min: 6 }),
  body('confirmationPassword', validationErrorMessages.PASSWORD_CONFIRMATION)
    .exists()
    .custom((confirmationPassword, { req }) => confirmationPassword === req.body.password)
];

const getLoginValidationRules = () => [
  body('email', validationErrorMessages.EMAIL).exists().isEmail(),
  body('password', validationErrorMessages.PASSWORD).exists().isLength({ min: 6 })
];

const validateUser = (req, res, next) => {
  console.log('req.body', req.body);
  const errors = validationResult(req);
  console.log('errors', errors)

  if (errors.isEmpty()) {
    return next();
  }

  const errorMessages = errors.array().map(err => err.msg);

  res.status(400).json({
    errorMessage: errorMessages[0]
  });
};

module.exports = {
  getSignupValidationRules,
  getLoginValidationRules,
  validateUser
};
