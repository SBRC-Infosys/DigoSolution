const asyncHandler = require('express-async-handler');
const { pool } = require('../config/db.js');

// Create a new news event category
exports.createNewsEventCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    try {
        const [result] = await pool.query(`
            INSERT INTO newsEventCategories (name, description)
            VALUES (?, ?);
        `, [name, description]);

        return res.status(201).json({
            status: 201,
            message: 'News event category created successfully',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create news event category",
            error: error
        });
    }
});

// Get all news event categories
exports.getNewsEventCategories = asyncHandler(async (req, res) => {
    try {
        const [result] = await pool.query(`SELECT * FROM newsEventCategories;`);

        if (result.length > 0) {
            res.status(200).json({
                message: 'Success',
                data: result
            });
        } else {
            res.status(404).json({
                message: "No news event categories found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch news event categories",
            error: error
        });
    }
});

// Get a news event category by ID
exports.getNewsEventCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(`SELECT * FROM newsEventCategories WHERE id = ?;`, [id]);

        if (result.length > 0) {
            res.status(200).json({
                message: 'Success',
                data: result[0]
            });
        } else {
            res.status(404).json({
                message: "News event category not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch news event category",
            error: error
        });
    }
});

// Update a news event category by ID
exports.updateNewsEventCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const [existingCategory] = await pool.query(`SELECT * FROM newsEventCategories WHERE id = ?;`, [id]);

        if (existingCategory.length === 0) {
            return res.status(404).json({ message: 'News event category not found' });
        }

        const [result] = await pool.query(`
            UPDATE newsEventCategories 
            SET 
                name = COALESCE(?, name),
                description = COALESCE(?, description),
                updated_at = NOW()
            WHERE id = ?;
        `, [name, description, id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Failed to update news event category' });
        } else {
            res.status(200).json({
                message: 'News event category updated successfully',
                id: id
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to update news event category",
            error: error
        });
    }
});

// Delete a news event category by ID
exports.deleteNewsEventCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const [existingCategory] = await pool.query(`SELECT * FROM newsEventCategories WHERE id = ?;`, [id]);

        if (existingCategory.length === 0) {
            return res.status(404).json({ message: 'News event category not found' });
        }

        const [result] = await pool.query(`DELETE FROM newsEventCategories WHERE id = ?;`, [id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Failed to delete news event category' });
        } else {
            res.status(200).json({
                message: 'News event category deleted successfully',
                id: id
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete news event category",
            error: error
        });
    }
});
