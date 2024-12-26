const express = require('express');
const testimonialController = require('../controllers/testimonialController');

const router = express.Router();

// Define routes for testimonials
router.get('/', testimonialController.getAllTestimonials);
router.get('/:id', testimonialController.getTestimonialById);
router.post('/', testimonialController.createTestimonial);
router.put('/:id', testimonialController.updateTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;
