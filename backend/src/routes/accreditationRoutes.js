const express = require('express');
const router = express.Router();
const accreditationController = require('../controllers/accreditationController');

// Get all accreditations and certifications
router.get('/', accreditationController.getAllAccreditations);

// Get a single accreditation or certification by ID
router.get('/:id', accreditationController.getAccreditationById);

// Create a new accreditation or certification
router.post('/', accreditationController.createAccreditation);

// Update an existing accreditation or certification
router.put('/:id', accreditationController.updateAccreditation);

// Delete an accreditation or certification
router.delete('/:id', accreditationController.deleteAccreditation);

module.exports = router;
