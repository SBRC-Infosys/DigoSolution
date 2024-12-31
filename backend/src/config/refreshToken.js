const jwt = require('jsonwebtoken');

const generateRefreshToken = (id, email) => {
  return jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

module.exports = { generateRefreshToken };
