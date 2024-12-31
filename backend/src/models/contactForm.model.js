const { db } = require("../config/db");

const createContactForm = async () => {
  await db.execute(sql`
    CREATE TABLE contact_form (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(40),
      phone VARCHAR(20),
      address VARCHAR(60),
      subject VARCHAR(255),
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
};

module.exports = { createContactForm };
