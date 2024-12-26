const express = require('express');
const consultationController = require('../controllers/consultationController');

const router = express.Router();

// Get all consultation requests
router.get('/', consultationController.getAllConsultationRequests);

// Get a specific consultation request by ID
router.get('/:id', consultationController.getConsultationRequestById);

// Create a new consultation request
router.post('/', consultationController.createConsultationRequest);

// Delete a consultation request by ID
router.delete('/:id', consultationController.deleteConsultationRequest);

module.exports = router;
