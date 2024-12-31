const nodemailer = require('nodemailer');

/**
 * Sends an email with the OTP.
 * @param {string} to - The recipient's email address.
 * @param {string} otp - The OTP to be sent.
 */
const sendOtpEmail = async (to, otp) => {
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or your preferred email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. Please use this code to complete your authentication process.`,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully.');
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};

module.exports = { sendOtpEmail };
