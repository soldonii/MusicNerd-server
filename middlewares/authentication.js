const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({
      message: '인증되지 않은 유저입니다.'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      message: '유효하지 않은 토큰입니다.'
    });
  }
};
