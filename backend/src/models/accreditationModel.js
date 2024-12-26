const db = require('../config/db');

// Get all accreditations and certifications
exports.getAllAccreditations = (callback) => {
    const query = 'SELECT * FROM AccreditationsCertifications';
    db.query(query, callback);
};

// Get a single accreditation or certification by ID
exports.getAccreditationById = (id, callback) => {
    const query = 'SELECT * FROM AccreditationsCertifications WHERE AccreditationID = ?';
    db.query(query, [id], callback);
};

// Create a new accreditation or certification
exports.createAccreditation = (CertificationTitle, img_url, callback) => {
    const query = 'INSERT INTO AccreditationsCertifications (CertificationTitle, img_url) VALUES (?, ?)';
    db.query(query, [CertificationTitle, img_url], callback);
};

// Update an existing accreditation or certification
exports.updateAccreditation = (id, CertificationTitle, img_url, callback) => {
    const query = 'UPDATE AccreditationsCertifications SET CertificationTitle = ?, img_url = ? WHERE AccreditationID = ?';
    db.query(query, [CertificationTitle, img_url, id], callback);
};

// Delete an accreditation or certification
exports.deleteAccreditation = (id, callback) => {
    const query = 'DELETE FROM AccreditationsCertifications WHERE AccreditationID = ?';
    db.query(query, [id], callback);
};
