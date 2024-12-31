const { db } = require("../config/db");
const { sql } = require('drizzle-orm');

const create_news_events = async () => {
  await db.execute(sql`
    CREATE TABLE news_events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category_id INT,
      content TEXT NOT NULL,
      author_id INT,
      img_url VARCHAR(255),
      published_at DATETIME NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES newsEventCategories(id) ON DELETE SET NULL,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
    );
  `);
};

module.exports = { create_news_events };
