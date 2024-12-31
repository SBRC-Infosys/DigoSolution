const express = require("express");
const { upload } = require("../middlewares/multer.middleware.js");
const { createTestimonial, deleteTestimonialById, getAllTestimonials, getTestimonialById, updateTestimonial } = require("../controllers/testimonialsCtrl.js");

const router = express.Router();

router.get('/', getAllTestimonials);

router.get('/:id', getTestimonialById);

router.post('/add', createTestimonial);

router.patch('/update/:id', updateTestimonial);

router.delete('/delete/:id', deleteTestimonialById);

module.exports = router;
