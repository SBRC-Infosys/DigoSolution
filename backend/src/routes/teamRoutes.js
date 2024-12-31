const express = require("express");
const { addTeamMember, deleteTeamMember, getTeamMember, getTeamMembers, updateTeamMember } = require("../controllers/teamCtrl.js");
const { upload } = require("../middlewares/multer.middleware.js");

const router = express.Router();

router.get('/', getTeamMembers);

router.get('/:id', getTeamMember);

router.post('/add', upload.single('image'), addTeamMember); // Add image upload

router.patch('/:id', upload.single('image'), updateTeamMember); // Add image upload

router.delete('/:id', deleteTeamMember);

module.exports = router;
