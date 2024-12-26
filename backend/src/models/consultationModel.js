const db = require('../config/db');

const ConsultationRequests = {
  getAll: (callback) => {
    db.query('SELECT * FROM ConsultationRequests', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM ConsultationRequests WHERE ConsultationID = ?', [id], callback);
  },
  create: (consultationData, callback) => {
    db.query('INSERT INTO ConsultationRequests SET ?', consultationData, callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM ConsultationRequests WHERE ConsultationID = ?', [id], callback);
  }
};

module.exports = ConsultationRequests;
