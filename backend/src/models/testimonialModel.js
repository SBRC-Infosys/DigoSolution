const db = require('../config/db');

const Testimonial = {
  getAll: (callback) => db.query('SELECT * FROM Testimonials', callback),
  getById: (id, callback) =>
    db.query('SELECT * FROM Testimonials WHERE TestimonialID = ?', [id], callback),
  create: (testimonial, callback) =>
    db.query('INSERT INTO Testimonials SET ?', testimonial, callback),
  update: (id, testimonial, callback) =>
    db.query('UPDATE Testimonials SET ? WHERE TestimonialID = ?', [testimonial, id], callback),
  delete: (id, callback) =>
    db.query('DELETE FROM Testimonials WHERE TestimonialID = ?', [id], callback),
};

module.exports = Testimonial;
