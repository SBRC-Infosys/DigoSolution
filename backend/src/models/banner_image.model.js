const { db } = require("../config/db");

const create_banner_image = async () => {
  await db.execute(sql`
    CREATE TABLE banner_image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    img_url VARCHAR(255),
    action_button_url VARCHAR(255),
    button_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
  `);
};

module.exports = { create_banner_image };
