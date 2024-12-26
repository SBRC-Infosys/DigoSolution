const Accreditation = require('../models/accreditationModel');

// Get all accreditations and certifications
exports.getAllAccreditations = (req, res) => {
    Accreditation.getAllAccreditations((err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
};

// Get a single accreditation or certification by ID
exports.getAccreditationById = (req, res) => {
    const id = req.params.id;
    Accreditation.getAccreditationById(id, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).json({ message: 'Accreditation not found' });
        res.status(200).json(results[0]);
    });
};

// Create a new accreditation or certification
exports.createAccreditation = (req, res) => {
    const { CertificationTitle, img_url } = req.body;
    Accreditation.createAccreditation(CertificationTitle, img_url, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: 'Accreditation created successfully', id: results.insertId });
    });
};

// Update an existing accreditation or certification
exports.updateAccreditation = (req, res) => {
    const id = req.params.id;
    const { CertificationTitle, img_url } = req.body;
    Accreditation.updateAccreditation(id, CertificationTitle, img_url, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Accreditation not found' });
        res.status(200).json({ message: 'Accreditation updated successfully' });
    });
};

// Delete an accreditation or certification
exports.deleteAccreditation = (req, res) => {
    const id = req.params.id;
    Accreditation.deleteAccreditation(id, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Accreditation not found' });
        res.status(200).json({ message: 'Accreditation deleted successfully' });
    });
};
