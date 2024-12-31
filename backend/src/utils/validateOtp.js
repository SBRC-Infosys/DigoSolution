const { pool } = require("../config/db.js");

const validateOtp = async (providedOtp, email) => {
  try {
    // Execute the query to find the OTP associated with the email
    const [rows] = await pool.query(`
      SELECT otp, expires_at FROM otp WHERE email = ?;
    `, [email]);

    if (rows.length === 0) {
      return false; // OTP not found
    }

    const { otp: storedOtp, expires_at: expiresAt } = rows[0];
    const currentTime = new Date();

    // Check if OTP is valid and not expired
    const isValid = providedOtp === storedOtp && currentTime <= expiresAt;

    return isValid;
  } catch (error) {
    console.error("Error validating OTP:", error);
    throw error; // Ensure to throw the error for proper error handling
  }
};

module.exports = { validateOtp };
