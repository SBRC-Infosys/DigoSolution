const asyncHandler = require('express-async-handler');
const { pool } = require('../config/db.js');

exports.createTestimonial = asyncHandler(async (req, res) => {
    const { author_name, designation, content } = req.body;

    try {
        const [result] = await pool.query(`
            INSERT INTO testimonials (author_name, designation, content)
            VALUES (?, ?, ?);
        `, [author_name, designation, content]);

        res.status(201).json({
            message: 'Testimonial created successfully',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create testimonial',
            error: error
        });
    }
});

exports.getAllTestimonials = asyncHandler(async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM testimonials;');
        res.status(200).json({
            message: 'Testimonials fetched successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch testimonials',
            error: error
        });
    }
});


exports.getTestimonialById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('SELECT * FROM testimonials WHERE id = ?;', [id]);

        if (result.length > 0) {
            res.status(200).json({
                message: 'Testimonial fetched successfully',
                data: result[0]
            });
        } else {
            res.status(404).json({
                message: 'Testimonial not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch testimonial',
            error: error
        });
    }
});

exports.updateTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { author_name, designation, content } = req.body;

    try {
        const [result] = await pool.query(`
            UPDATE testimonials
            SET author_name = COALESCE(?, author_name),
                designation = COALESCE(?, designation),
                content = COALESCE(?, content),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?;
        `, [author_name, designation, content, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Testimonial updated successfully'
            });
        } else {
            res.status(404).json({
                message: 'Testimonial not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update testimonial',
            error: error
        });
    }
});

exports.deleteTestimonialById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM testimonials WHERE id = ?;', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Testimonial deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'Testimonial not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete testimonial',
            error: error
        });
    }
});
