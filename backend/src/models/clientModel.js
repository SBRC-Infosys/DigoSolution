const db = require('../config/db');

// Get all clients
const getClients = async () => {
  const query = 'SELECT * FROM OurClients';
  const [rows] = await db.promise().query(query);
  return rows;
};

// Add a new client
const addClient = async (companyName, logo) => {
  const query = 'INSERT INTO OurClients (CompanyName, Logo) VALUES (?, ?)';
  const [result] = await db.promise().query(query, [companyName, logo]);
  return result;
};

// Update a client
const updateClient = async (clientId, companyName, logo) => {
  const query = 'UPDATE OurClients SET CompanyName = ?, Logo = ? WHERE ClientID = ?';
  const [result] = await db.promise().query(query, [companyName, logo, clientId]);
  return result;
};

// Delete a client
const deleteClient = async (clientId) => {
  const query = 'DELETE FROM OurClients WHERE ClientID = ?';
  const [result] = await db.promise().query(query, [clientId]);
  return result;
};

module.exports = { getClients, addClient, updateClient, deleteClient };
