const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-access-token');

  if (!token) {
    return res.status(401).json({
      errorMessage: 'Unauthorized user.'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      errorMessage: 'Invalid Token.'
    });
  }
};
