const Testimonial = require('../models/testimonialModel');

// Get all testimonials
exports.getAllTestimonials = (req, res) => {
  Testimonial.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Get a single testimonial by ID
exports.getTestimonialById = (req, res) => {
  const { id } = req.params;
  Testimonial.getById(id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).json({ message: 'Testimonial not found' });
    res.json(results[0]);
  });
};

// Create a new testimonial
exports.createTestimonial = (req, res) => {
  const testimonial = req.body;

  // Input validation for required fields
  if (!testimonial.FullName || !testimonial.Message || !testimonial.StarRating) {
    return res.status(400).json({ message: 'FullName, Message, and StarRating are required' });
  }

  Testimonial.create(testimonial, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId, ...testimonial });
  });
};

// Update an existing testimonial
exports.updateTestimonial = (req, res) => {
  const { id } = req.params;
  const testimonial = req.body;

  Testimonial.update(id, testimonial, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Testimonial updated successfully' });
  });
};

// Delete a testimonial
exports.deleteTestimonial = (req, res) => {
  const { id } = req.params;

  Testimonial.delete(id, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Testimonial deleted successfully' });
  });
};
