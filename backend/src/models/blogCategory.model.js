const { db } = require("../config/db");
const { sql } = require("drizzle-orm");

const create_blog_categories = async () => {
  await db.execute(sql`
    CREATE TABLE blogCategories (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
};

module.exports = { create_blog_categories };
