const { db } = require("../config/db");
const { sql } = require('drizzle-orm'); // Ensure you're importing this if you're using Drizzle ORM

async function createTeam() {
    await db.execute(sql`
        CREATE TABLE IF NOT EXISTS team (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            phone VARCHAR(255),
            img_url VARCHAR(255),
            designation VARCHAR(255) NOT NULL,
            bio VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
    `);
}

module.exports = createTeam;
