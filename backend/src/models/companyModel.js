const { db } = require("../config/db");

const createCompany = async () => {
  await db.execute(sql`
    CREATE TABLE company (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_name VARCHAR(255) NOT NULL,
      logo_url VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(20),
      address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
};

module.exports = { createCompany };
