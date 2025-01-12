const express = require("express");
const {
  addClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/ourClientsController.js");

const router = express.Router();

// Clients routes
router.get('/', getClients); // Fetch all clients
router.get('/:id', getClientById); // Fetch a single client by ID
router.post('/add', addClient); // Add a new client
router.patch('/:id', updateClient); // Update a client by ID
router.delete('/:id', deleteClient); // Delete a client by ID

module.exports = router;
