const { db } = require("../config/db");
const { sql } = require('drizzle-orm');

const create_gallery = async () => {
  await db.execute(sql`
    CREATE TABLE gallery (
      id INT AUTO_INCREMENT PRIMARY KEY,
      url VARCHAR(255) NOT NULL,
      type ENUM('image', 'video') NOT NULL,
      title VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
};

module.exports = { create_gallery };
