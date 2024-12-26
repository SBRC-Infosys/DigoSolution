const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');

router.get('/', achievementController.getAllAchievements);
router.get('/:id', achievementController.getAchievementById);
router.post('/', achievementController.createAchievement);
router.put('/:id', achievementController.updateAchievement);
router.delete('/:id', achievementController.deleteAchievement);

module.exports = router;
