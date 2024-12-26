const Team = require('../models/teamModel');

// Get all team members
exports.getAllTeamMembers = (req, res) => {
  Team.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Get a single team member by ID
exports.getTeamMemberById = (req, res) => {
  const { id } = req.params;
  Team.getById(id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).json({ message: 'Team member not found' });
    res.json(results[0]);
  });
};

// Create a new team member
exports.createTeamMember = (req, res) => {
  const teamMember = req.body;

  // Input validation for required fields
  if (!teamMember.name || !teamMember.email || !teamMember.designation || !teamMember.bio) {
    return res.status(400).json({
      message: 'Name, Email, Designation, and Bio are required fields',
    });
  }

  Team.create(teamMember, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId, ...teamMember });
  });
};

// Update an existing team member
exports.updateTeamMember = (req, res) => {
  const { id } = req.params;
  const teamMember = req.body;

  Team.update(id, teamMember, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Team member updated successfully' });
  });
};

// Delete a team member
exports.deleteTeamMember = (req, res) => {
  const { id } = req.params;

  Team.delete(id, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Team member deleted successfully' });
  });
};
