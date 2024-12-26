const express = require('express');
const socialLinksController = require('../controllers/SocialLinksController');


const router = express.Router();

// Define routes for social links
router.get('/', socialLinksController.getAllSocialLinks);
router.get('/:id', socialLinksController.getSocialLinkById);
router.post('/', socialLinksController.createSocialLink);
router.put('/:id', socialLinksController.updateSocialLink);
router.delete('/:id', socialLinksController.deleteSocialLink);

module.exports = router;
