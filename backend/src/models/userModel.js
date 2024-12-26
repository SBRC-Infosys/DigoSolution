const db = require('../config/db');

const User = {
  getAll: (callback) => db.query('SELECT * FROM users', callback),
  getById: (id, callback) => db.query('SELECT * FROM users WHERE id = ?', [id], callback),
  create: (user, callback) =>
    db.query('INSERT INTO users SET ?', user, callback),
  update: (id, user, callback) =>
    db.query('UPDATE users SET ? WHERE id = ?', [user, id], callback),
  delete: (id, callback) =>
    db.query('DELETE FROM users WHERE id = ?', [id], callback),
};

module.exports = User;
