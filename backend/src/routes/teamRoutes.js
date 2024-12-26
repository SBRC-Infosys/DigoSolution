const express = require('express');
const teamController = require('../controllers/teamController');

const router = express.Router();

// Define routes for the team
router.get('/', teamController.getAllTeamMembers);
router.get('/:id', teamController.getTeamMemberById);
router.post('/', teamController.createTeamMember);
router.put('/:id', teamController.updateTeamMember);
router.delete('/:id', teamController.deleteTeamMember);

module.exports = router;
