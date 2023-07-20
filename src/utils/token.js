const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenGenerator = async (data) => {// Set the expiry time as desired, e.g., '1h' for 1 hour

  return jwt.sign(data, process.env.SECRET, { });
};

const tokenVerifier = (token) => {
  return jwt.verify(token, process.env.SECRET);
};

module.exports = { tokenGenerator, tokenVerifier };
