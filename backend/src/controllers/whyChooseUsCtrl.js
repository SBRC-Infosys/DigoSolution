const asyncHandler = require('express-async-handler');
const { pool } = require('../config/db.js');

const createWhyChooseUs = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    try {
        const [result] = await pool.query(`
            INSERT INTO whyChooseUs (title, description)
            VALUES (?, ?);
        `, [title, description]);

        res.status(201).json({
            message: 'Entry created successfully',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create entry',
            error: error
        });
    }
});

const getAllWhyChooseUs = asyncHandler(async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM whyChooseUs;');
        res.status(200).json({
            message: 'Entries fetched successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch entries',
            error: error
        });
    }
});

const getWhyChooseUsById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('SELECT * FROM whyChooseUs WHERE id = ?;', [id]);

        if (result.length > 0) {
            res.status(200).json({
                message: 'Entry fetched successfully',
                data: result[0]
            });
        } else {
            res.status(404).json({
                message: 'Entry not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch entry',
            error: error
        });
    }
});

const updateWhyChooseUs = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const [result] = await pool.query(`
            UPDATE whyChooseUs
            SET title = COALESCE(?, title),
                description = COALESCE(?, description),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?;
        `, [title, description, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Entry updated successfully'
            });
        } else {
            res.status(404).json({
                message: 'Entry not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update entry',
            error: error
        });
    }
});

const deleteWhyChooseUsById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM whyChooseUs WHERE id = ?;', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Entry deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'Entry not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete entry',
            error: error
        });
    }
});

module.exports = {
    createWhyChooseUs,
    getAllWhyChooseUs,
    getWhyChooseUsById,
    updateWhyChooseUs,
    deleteWhyChooseUsById
};
