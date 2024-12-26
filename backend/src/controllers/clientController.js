const { getClients, addClient, updateClient, deleteClient } = require('../models/clientModel');

// @desc    Get all clients
// @route   GET /api/clients
// @access  Public
const getClientsHandler = async (req, res) => {
  try {
    const clients = await getClients();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients', error });
  }
};

// @desc    Add a new client
// @route   POST /api/clients
// @access  Public
const addClientHandler = async (req, res) => {
  const { companyName, logo } = req.body;

  if (!companyName) {
    return res.status(400).json({ message: 'Company name is required' });
  }

  try {
    const result = await addClient(companyName, logo);
    res.status(201).json({ message: 'Client added successfully', clientId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error adding client', error });
  }
};

// @desc    Update a client
// @route   PUT /api/clients/:id
// @access  Public
const updateClientHandler = async (req, res) => {
  const { id } = req.params;
  const { companyName, logo } = req.body;

  if (!companyName) {
    return res.status(400).json({ message: 'Company name is required' });
  }

  try {
    const result = await updateClient(id, companyName, logo);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating client', error });
  }
};

// @desc    Delete a client
// @route   DELETE /api/clients/:id
// @access  Public
const deleteClientHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteClient(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client', error });
  }
};

module.exports = { getClientsHandler, addClientHandler, updateClientHandler, deleteClientHandler };
