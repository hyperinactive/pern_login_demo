/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    // Bearer, token
    const token = req.headers.authorization.split(' ')[req.headers.authorization.split(' ').indexOf('Bearer') + 1];

    if (!token) {
      return res.status(403).json({ message: 'You\'re unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    res.locals.user = decoded.user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'You\'re unauthorized' });
  }
};
