const { db } = require("../config/db");

const createProductCategory = async () => {
  await db.execute(sql`
    CREATE TABLE product_category (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `);
};

const createProductList = async () => {
  await db.execute(sql`
    CREATE TABLE products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category_id INT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      regular_price DECIMAL(10, 2) NOT NULL,
      sale_price DECIMAL(10, 2) NULL,
      img_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES product_category(id)
    );
  `);
};

module.exports = { createProductCategory, createProductList };
