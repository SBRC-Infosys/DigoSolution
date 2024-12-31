const jwt = require('jsonwebtoken');
const { asyncHandler } = require('express-async-handler');
const { db } = require('../config/db.js');

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the Authorization header is present and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const [userRows] = await db.execute(`
        SELECT * FROM users WHERE id = ${decoded.id}
      `);

      // Check if the user exists
      if (userRows.length === 0) {
        res.status(401).json({ message: 'User not found' });
        return;
      }

      // Attach the user information to the request object
      req.user = userRows[0];

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401).json({ message: 'Not authorized, token failed or expired' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});

module.exports = { authMiddleware };
