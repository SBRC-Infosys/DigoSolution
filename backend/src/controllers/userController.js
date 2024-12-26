const User = require('../models/userModel');

exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.getById(id, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
};

exports.createUser = (req, res) => {
  const user = req.body;
  User.create(user, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId, ...user });
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const user = req.body;
  User.update(id, user, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'User updated successfully' });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  User.delete(id, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'User deleted successfully' });
  });
};
