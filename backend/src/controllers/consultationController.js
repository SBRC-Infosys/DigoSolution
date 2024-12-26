const ConsultationRequests = require('../models/consultationModel');

// Get all consultation requests
exports.getAllConsultationRequests = (req, res) => {
  ConsultationRequests.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Get a specific consultation request by ID
exports.getConsultationRequestById = (req, res) => {
  const { id } = req.params;
  ConsultationRequests.getById(id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0)
      return res.status(404).json({ message: 'Consultation request not found' });
    res.json(results[0]);
  });
};

// Create a new consultation request
exports.createConsultationRequest = (req, res) => {
  const consultationData = req.body;

  // Validate required fields
  if (!consultationData.FullName || !consultationData.Email || !consultationData.Message) {
    return res.status(400).json({
      message: 'FullName, Email, and Message are required fields.'
    });
  }

  ConsultationRequests.create(consultationData, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ ConsultationID: results.insertId, ...consultationData });
  });
};

// Delete a consultation request
exports.deleteConsultationRequest = (req, res) => {
  const { id } = req.params;

  ConsultationRequests.delete(id, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Consultation request deleted successfully' });
  });
};
