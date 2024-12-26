const express = require('express');
const contactFormController = require('../controllers/contactFormController');

const router = express.Router();

// Define routes for contact form
router.get('/', contactFormController.getAllContactForms);
router.get('/:id', contactFormController.getContactFormById);
router.post('/', contactFormController.createContactForm);
router.delete('/:id', contactFormController.deleteContactForm);

module.exports = router;
