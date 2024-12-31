const { db } = require("../config/db");

const createSocialLinks = async () => {
  await db.execute(sql`
    CREATE TABLE socialLinks (
      id INT PRIMARY KEY AUTO_INCREMENT,
      platform_name VARCHAR(255) NOT NULL,
      url VARCHAR(255) NOT NULL,
      icon VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
};

module.exports = { createSocialLinks };
