const cron = require('node-cron');
const { pool } = require('../config/db.js');

// Cron job to delete OTPs older than one day
cron.schedule('0 0 * * *', async () => {
  try {
    // SQL query to delete OTPs older than one day
    await pool.query("DELETE FROM otp WHERE created_at < NOW() - INTERVAL 1 DAY");
    console.log("Expired OTPs deleted.");
  } catch (error) {
    console.error("Error deleting expired OTPs:", error);
  }
});
