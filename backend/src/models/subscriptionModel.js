const db = require('../config/db');

const Subscription = {
  getAll: (callback) => db.query('SELECT * FROM Subscription', callback),
  getById: (id, callback) =>
    db.query('SELECT * FROM Subscription WHERE SubscriptionID = ?', [id], callback),
  create: (subscription, callback) =>
    db.query('INSERT INTO Subscription SET ?', subscription, callback),
  delete: (id, callback) =>
    db.query('DELETE FROM Subscription WHERE SubscriptionID = ?', [id], callback),
};

module.exports = Subscription;
