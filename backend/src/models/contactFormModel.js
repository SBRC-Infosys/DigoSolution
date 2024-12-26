const db = require('../config/db');

const ContactForm = {
  getAll: (callback) => db.query('SELECT * FROM ContactForm', callback),
  getById: (id, callback) =>
    db.query('SELECT * FROM ContactForm WHERE ContactID = ?', [id], callback),
  create: (formData, callback) =>
    db.query('INSERT INTO ContactForm SET ?', formData, callback),
  delete: (id, callback) =>
    db.query('DELETE FROM ContactForm WHERE ContactID = ?', [id], callback),
};

module.exports = ContactForm;
