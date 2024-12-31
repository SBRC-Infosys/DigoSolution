const asyncHandler = require('express-async-handler');
const { pool } = require('../config/db.js');
const { deleteCloudinaryImage, uploadOnCloudinary } = require('../services/cloudinary.js');

// Create Company entry
exports.createCompany = asyncHandler(async (req, res) => {
    const { company_name, email, phone, address } = req.body;
    let logo_url = null;

    try {
        // Upload the logo image to Cloudinary if provided
        if (req.file) {
            const uploadResult = await uploadOnCloudinary(req.file.path);
            if (!uploadResult) {
                return res.status(500).json({ message: 'Failed to upload logo image' });
            }
            logo_url = uploadResult.secure_url;
        }

        const [result] = await pool.query(`
            INSERT INTO company (company_name, logo_url, email, phone, address)
            VALUES (?, ?, ?, ?, ?);
        `, [company_name, logo_url, email, phone, address]);

        res.status(201).json({
            status: 201,
            message: 'Company entry created successfully',
            id: result.insertId
        });
    } catch (error) {
        if (logo_url) {
            deleteCloudinaryImage(logo_url);
        }
        console.error('Error creating Company entry:', error);
        res.status(500).json({ message: 'Failed to create Company entry' });
    }
});

exports.getCompany = asyncHandler(async (req, res) => {

    try {
        const [rows] = await pool.query('SELECT * FROM company;');

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Company entry not found' });
        }

        res.json({
            status: 200,
            data: rows,
        });
    } catch (error) {
        console.error('Error fetching Company entry:', error);
        res.status(500).json({ message: 'Failed to fetch Company entry' });
    }
});

// Read Company entry by ID
exports.getCompanyById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query('SELECT * FROM company WHERE id = ?;', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Company entry not found' });
        }

        res.json({
            status: 200,
            data: rows[0]
        });
    } catch (error) {
        console.error('Error fetching Company entry:', error);
        res.status(500).json({ message: 'Failed to fetch Company entry' });
    }
});

// Update Company entry by ID
exports.updateCompanyById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { company_name, email, phone, address } = req.body;
    let logo_url = null;

    try {
        // Prepare dynamic fields for SQL query
        const fields = [];
        const values = [];

        if (company_name) {
            fields.push('company_name = ?');
            values.push(company_name);
        }
        if (req.file) {
            // Upload new logo image to Cloudinary and handle old one
            const uploadResult = await uploadOnCloudinary(req.file.path);
            if (!uploadResult) {
                return res.status(500).json({ message: 'Failed to upload new logo image' });
            }
            // Fetch existing data to delete old image
            const [existingEntry] = await pool.query('SELECT logo_url FROM company WHERE id = ?;', [id]);
            if (existingEntry.length > 0 && existingEntry[0].logo_url) {
                await deleteCloudinaryImage(existingEntry[0].logo_url);
            }
            logo_url = uploadResult.secure_url;
            fields.push('logo_url = ?');
            values.push(logo_url);
        }
        if (email) {
            fields.push('email = ?');
            values.push(email);
        }
        if (phone) {
            fields.push('phone = ?');
            values.push(phone);
        }
        if (address) {
            fields.push('address = ?');
            values.push(address);
        }

        if (fields.length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        const updateSql = `
            UPDATE company
            SET ${fields.join(', ')}
            WHERE id = ?;
        `;
        values.push(id); // Add the ID for the WHERE clause

        const [result] = await pool.query(updateSql, values);

        if (result.affectedRows > 0) {
            const [rows] = await pool.query('SELECT * FROM company WHERE id = ?;', [id]);
            res.json({
                status: 200,
                message: 'Company entry updated successfully',
                data: rows[0]
            });
        } else {
            if (logo_url) {
                deleteCloudinaryImage(logo_url);
            }
            res.status(404).json({ message: 'Company entry not found' });
        }
    } catch (error) {
        if (logo_url) {
            deleteCloudinaryImage(logo_url);
        }
        console.error('Error updating Company entry:', error);
        res.status(500).json({ message: 'Failed to update Company entry' });
    }
});

exports.deleteCompanyById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the company entry exists
        const [existingEntry] = await pool.query('SELECT * FROM company WHERE id = ?;', [id]);

        if (existingEntry.length === 0) {
            return res.status(404).json({ message: 'Company entry not found' });
        }

        const company = existingEntry[0];

        // Delete the logo image from Cloudinary if it exists
        if (company.logo_url) {
            await deleteCloudinaryImage(company.logo_url);
        }

        // Delete the company entry from the database
        const [deleteResult] = await pool.query('DELETE FROM company WHERE id = ?;', [id]);

        if (deleteResult.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'Company entry deleted successfully',
            });
        } else {
            res.status(500).json({
                message: 'Failed to delete Company entry',
            });
        }
    } catch (error) {
        console.error('Error deleting Company entry:', error);
        res.status(500).json({ message: 'Failed to delete Company entry' });
    }
});