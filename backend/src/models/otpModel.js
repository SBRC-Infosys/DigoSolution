const { db } = require("../config/db");

const createOTPtable = async () => {
  await db.execute(sql`
    CREATE TABLE otp (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      otp VARCHAR(10) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      expires_at TIMESTAMP NOT NULL,
      UNIQUE(email)
    );
  `);
};

module.exports = { createOTPtable };
