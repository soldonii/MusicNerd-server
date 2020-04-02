const { body, validationResult } = require('express-validator');

const validationErrorMessages = {
  USERNAME: 'username은 소문자만 가능합니다.',
  GENDER: '성별은 필수항목입니다.',
  EMAIL: '유효한 email이 아닙니다.',
  PASSWORD: '비밀번호는 6자 이상이어야 합니다.',
  PASSWORD_CONFIRMATION: '비밀번호가 일치하지 않습니다.'
};

const getSignupValidationRules = () => [
  body('username', validationErrorMessages.USERNAME).exists().isLowercase(),
  body('gender', validationErrorMessages.GENDER).exists(),
  body('email', validationErrorMessages.EMAIL).exists().isEmail(),
  body('password', validationErrorMessages.PASSWORD).exists().isLength({ min: 6 }),
  body('passwordConfirmation', validationErrorMessages.PASSWORD_CONFIRMATION)
    .exists()
    .custom((value, { req }) => value === req.body.password)
];

const getLoginValidationRules = () => [
  body('email', validationErrorMessages.EMAIL).exists().isEmail(),
  body('password', validationErrorMessages.PASSWORD).exists().isLength({ min: 6 })
];

const validateUser = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorMessages = errors.array().map(err => err.msg);

  res.status(400).json({
    message: errorMessages
  });
};

module.exports = {
  getSignupValidationRules,
  getLoginValidationRules,
  validateUser
};
