const { db } = require("../config/db");

const create_banner_img_url = async () => {
  await db.execute(sql`
    CREATE TABLE banner_img_url (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
  `);
};

module.exports = { create_banner_img_url };
