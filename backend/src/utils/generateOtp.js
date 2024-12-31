const crypto = require('crypto');

/**
 * Generates a random OTP of a specified length.
 * @param {number} length - The length of the OTP.
 * @returns {string} - The generated OTP.
 */
const generateOtp = (length = 6) => {
  // Generate a random integer within the range for the desired length
  const otp = crypto.randomInt(10 ** (length - 1), 10 ** length);
  // Pad with leading zeros if necessary and return as a string
  return otp.toString().padStart(length, '0');
};

module.exports = { generateOtp };
