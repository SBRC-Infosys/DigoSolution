const { db } = require("../config/db");
const { sql } = require('drizzle-orm'); // Ensure you're importing this if you're using Drizzle ORM

async function createTestimonials() {
    await db.execute(sql`
    CREATE TABLE testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE
    CURRENT_TIMESTAMP
    );
    `);
}

module.exports = createTestimonials;
