const asyncHandler = require('express-async-handler');
const { pool } = require('../config/db.js');
const { deleteCloudinaryImage, uploadOnCloudinary } = require('../services/cloudinary.js');
const mime = require('mime-types');


exports.addToGallery = asyncHandler(async (req, res) => {
    const { title } = req.body;
    let url = null;
    let type = null;

    try {
        
        if (req.file) {
            // Get MIME type of the uploaded file
            const mimeType = mime.lookup(req.file.originalname);

            if (mimeType && mimeType.startsWith('image/')) {
                type = 'image';
            } else {
                return res.status(400).json({ message: 'Unsupported file type. Only images are allowed.' });
            }

            // Upload the image to Cloudinary
            const uploadResult = await uploadOnCloudinary(req.file.path);
            if (!uploadResult) {
                return res.status(500).json({ message: 'Failed to upload image' });
            }
            url = uploadResult.secure_url; // Get URL from Cloudinary response

           
        }
        // Handle video URL
        else if (req.body.url) {
            // Validate URL and set type as video
            url = req.body.url;
            type = 'video';
        }
        else {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Insert into the gallery table
        const [result] = await pool.query(`
            INSERT INTO gallery ( url, type, title)
            VALUES (?, ?, ?);
        `, [ url, type, title]);

        res.status(201).json({
            message: 'Media added to the gallery successfully',
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to add to the gallery',
            error: error
        });
    }
});

exports.getAllGalleryItems = asyncHandler(async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM gallery;');
        res.status(200).json({
            message: 'Gallery items fetched successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch gallery items',
            error: error
        });
    }
});

exports.getGalleryItemById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('SELECT * FROM gallery WHERE id = ?;', [id]);

        if (result.length > 0) {
            res.status(200).json({
                message: 'Gallery item fetched successfully',
                data: result[0]
            });
        } else {
            res.status(404).json({
                message: 'Gallery item not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch gallery item',
            error: error
        });
    }
});

exports.deleteGalleryItemById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Get the item to retrieve the URL for Cloudinary deletion
        const [item] = await pool.query('SELECT * FROM gallery WHERE id = ?;', [id]);

        if (item.length === 0) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        const media = item[0];
        
        // Delete image from Cloudinary if it's an image
        if (media.type === 'image' && media.url) {
            const deleteResult = await deleteCloudinaryImage(media.url);
            console.log('url: ',media.url)
            // console.log('dlete: ',deleteResult)
            if (!deleteResult) {
                return res.status(500).json({ message: 'Failed to delete image from Cloudinary' });
            }
        }

        // Delete the item from the database
        const [result] = await pool.query('DELETE FROM gallery WHERE id = ?;', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Gallery item deleted successfully'
            });
        } else {
            res.status(500).json({
                message: 'Failed to delete gallery item'
            });
        }
    } catch (error) {
        console.error('Delete gallery item error:', error);
        res.status(500).json({
        message: 'Failed to delete gallery item',
        error: error.message || error
        });
    }
});

exports.updateGalleryItemById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, url } = req.body;
    let type = null;
    let newUrl = url;

    try {
        // Check if the item exists
        const [existingItem] = await pool.query('SELECT * FROM gallery WHERE id = ?;', [id]);
        if (existingItem.length === 0) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        const media = existingItem[0];

        // Handle file upload
        if (req.file) {
            // Get MIME type of the uploaded file
            const mimeType = mime.lookup(req.file.originalname);

            if (mimeType && mimeType.startsWith('image/')) {
                type = 'image';
            } else {
                return res.status(400).json({ message: 'Unsupported file type. Only images are allowed.' });
            }

            // Delete old image from Cloudinary if it exists
            if (media.type === 'image') {
                const deleteResult = await deleteCloudinaryImage(media.url);
                if (!deleteResult) {
                    return res.status(500).json({ message: 'Failed to delete old image from Cloudinary' });
                }
            }

            // Upload the new image to Cloudinary
            const uploadResult = await uploadOnCloudinary(req.file.path);
            if (!uploadResult) {
                return res.status(500).json({ message: 'Failed to upload new image' });
            }
            newUrl = uploadResult.secure_url;
            type = 'image';
        } else if (url) {
            type = 'video';
        } else {
            newUrl = media.url;
            type = media.type;
        }

        // Update the gallery item
        const [result] = await pool.query(`
            UPDATE gallery 
            SET 
                title = COALESCE(?, title),
                url = COALESCE(?, url),
                type = COALESCE(?, type)
            WHERE id = ?;
        `, [title, newUrl, type, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Gallery item updated successfully'
            });
        } else {
            res.status(500).json({
                message: 'Failed to update gallery item'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update gallery item',
            error: error
        });
    }
});

