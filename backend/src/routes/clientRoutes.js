const express = require('express');
const router = express.Router();
const {
  getClientsHandler,
  addClientHandler,
  updateClientHandler,
  deleteClientHandler,
} = require('../controllers/clientController');

// Routes for clients
router.get('/', getClientsHandler);
router.post('/', addClientHandler);
router.put('/:id', updateClientHandler);
router.delete('/:id', deleteClientHandler);

module.exports = router;
