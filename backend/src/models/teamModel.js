const db = require('../config/db');

const Team = {
  getAll: (callback) => db.query('SELECT * FROM team', callback),
  getById: (id, callback) =>
    db.query('SELECT * FROM team WHERE id = ?', [id], callback),
  create: (teamMember, callback) =>
    db.query('INSERT INTO team SET ?', teamMember, callback),
  update: (id, teamMember, callback) =>
    db.query('UPDATE team SET ? WHERE id = ?', [teamMember, id], callback),
  delete: (id, callback) =>
    db.query('DELETE FROM team WHERE id = ?', [id], callback),
};

module.exports = Team;
