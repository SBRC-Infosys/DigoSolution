const { db } = require("../config/db");
const { sql } = require("drizzle-orm");

const create_subscription_table = async () => {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS Subscription (
      SubscriptionID INT AUTO_INCREMENT PRIMARY KEY,
      FullName VARCHAR(100),
      Email VARCHAR(100) UNIQUE NOT NULL,
      SubscribedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

module.exports = { create_subscription_table };
