require('dotenv').config();
const jwt = require('jsonwebtoken');

const tokenGenerator = (user_id) => {
  const payload = {
    user: user_id,
  };
  // expiration in seconds
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 60 * 30 });
};

module.exports = tokenGenerator;
