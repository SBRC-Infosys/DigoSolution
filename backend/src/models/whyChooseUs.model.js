const { db } = require("../config/db");

async function createWhyChooseUs() {
    await db.execute(sql`
    CREATE TABLE whyChooseUs (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `);
}

module.exports = createWhyChooseUs;
