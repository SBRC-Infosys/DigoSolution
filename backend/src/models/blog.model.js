const { db } = require("../config/db");
const { sql } = require('drizzle-orm');

const create_blog = async () => {
  await db.execute(sql`
    CREATE TABLE blog (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category_id INT,
      content TEXT NOT NULL,
      img_url VARCHAR(255),
      author_id INT,
      published_at DATETIME NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES blogCategories(id) ON DELETE SET NULL,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
    );
  `);
};

module.exports = { create_blog };
