const db = require('../config/db');

const SocialLinks = {
  getAll: (callback) => db.query('SELECT * FROM socialLinks', callback),
  getById: (id, callback) =>
    db.query('SELECT * FROM socialLinks WHERE id = ?', [id], callback),
  create: (socialLink, callback) =>
    db.query('INSERT INTO socialLinks SET ?', socialLink, callback),
  update: (id, socialLink, callback) =>
    db.query('UPDATE socialLinks SET ? WHERE id = ?', [socialLink, id], callback),
  delete: (id, callback) =>
    db.query('DELETE FROM socialLinks WHERE id = ?', [id], callback),
};

module.exports = SocialLinks;
