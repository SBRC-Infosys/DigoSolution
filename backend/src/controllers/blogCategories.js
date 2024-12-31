const asyncHandler = require('express-async-handler');
const { pool } = require('../config/db.js');

// Create a new blog category
exports.createBlogCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO blogCategories (name, description) VALUES (?, ?);`,
            [name, description]
        );

        res.status(201).json({
            status: 201,
            message: 'Blog category created successfully',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create blog category',
            error: error.message || error
        });
    }
});

// Get all blog categories
exports.getBlogCategories = asyncHandler(async (req, res) => {
    try {
        const [result] = await pool.query(`SELECT * FROM blogCategories;`);

        if (result.length > 0) {
            res.status(200).json({
                message: 'Success',
                data: result
            });
        } else {
            res.status(404).json({
                message: 'No blog categories found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch blog categories',
            error: error.message || error
        });
    }
});

// Get a blog category by ID
exports.getBlogCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            `SELECT * FROM blogCategories WHERE id = ?;`,
            [id]
        );

        if (result.length > 0) {
            res.status(200).json({
                message: 'Success',
                data: result[0]
            });
        } else {
            res.status(404).json({
                message: 'Blog category not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch blog category',
            error: error.message || error
        });
    }
});

// Update a blog category by ID
exports.updateBlogCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const [existingCategory] = await pool.query(
            `SELECT * FROM blogCategories WHERE id = ?;`,
            [id]
        );

        if (existingCategory.length === 0) {
            return res.status(404).json({ message: 'Blog category not found' });
        }

        const [result] = await pool.query(
            `UPDATE blogCategories 
             SET 
                 name = COALESCE(?, name),
                 description = COALESCE(?, description),
                 updated_at = NOW()
             WHERE id = ?;`,
            [name, description, id]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Failed to update blog category' });
        } else {
            res.status(200).json({
                message: 'Blog category updated successfully',
                id: id
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update blog category',
            error: error.message || error
        });
    }
});

// Delete a blog category by ID
exports.deleteBlogCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const [existingCategory] = await pool.query(
            `SELECT * FROM blogCategories WHERE id = ?;`,
            [id]
        );

        if (existingCategory.length === 0) {
            return res.status(404).json({ message: 'Blog category not found' });
        }

        const [result] = await pool.query(
            `DELETE FROM blogCategories WHERE id = ?;`,
            [id]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Failed to delete blog category' });
        } else {
            res.status(200).json({
                message: 'Blog category deleted successfully',
                id: id
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete blog category',
            error: error.message || error
        });
    }
});
