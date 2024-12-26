const ContactForm = require('../models/contactFormModel');

// Get all contact form entries
exports.getAllContactForms = (req, res) => {
  ContactForm.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Get a specific contact form entry by ID
exports.getContactFormById = (req, res) => {
  const { id } = req.params;
  ContactForm.getById(id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0)
      return res.status(404).json({ message: 'Contact form entry not found' });
    res.json(results[0]);
  });
};

// Create a new contact form entry
exports.createContactForm = (req, res) => {
  const formData = req.body;

  // Validate required fields
  if (!formData.FullName || !formData.Email || !formData.Message) {
    return res.status(400).json({
      message: 'FullName, Email, and Message are required fields.',
    });
  }

  ContactForm.create(formData, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ ContactID: results.insertId, ...formData });
  });
};

// Delete a contact form entry
exports.deleteContactForm = (req, res) => {
  const { id } = req.params;

  ContactForm.delete(id, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Contact form entry deleted successfully' });
  });
};
