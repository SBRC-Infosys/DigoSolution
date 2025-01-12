const { db } = require("../config/db");

const createOurClients = async () => {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS OurClients (
      ClientID INT AUTO_INCREMENT PRIMARY KEY,
      CompanyName VARCHAR(255) NOT NULL,
      Logo VARCHAR(255)
    );
  `);
};

module.exports = { createOurClients };
