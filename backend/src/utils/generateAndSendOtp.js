const { generateOtp } = require('./generateOtp.js');
const { sendOtpEmail } = require('./emailUtils.js');
const { saveOtpToDatabase } = require('./databaseUtils.js'); // A function to save OTP and timestamp

const length = 6;
const otp = generateOtp(length);
const userEmail = 'user@example.com'; // This should be the email of the user you're sending OTP to

// Save OTP and timestamp to database or in-memory store
saveOtpToDatabase(userEmail, otp, Date.now())
  .then(() => {
    // Send OTP via email
    return sendOtpEmail(userEmail, otp);
  })
  .catch((error) => {
    console.error('Error handling OTP process:', error);
  });

// For storing OTP part

const email = 'user@example.com'; // User's email address
const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

pool.query(
  'INSERT INTO otp (email, otp, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE otp = VALUES(otp), expires_at = VALUES(expires_at)',
  [email, otp, expiresAt]
)
  .then(([result]) => {
    console.log('OTP stored in database successfully:', result);
  })
  .catch((error) => {
    console.error('Error storing OTP in database:', error);
  });
