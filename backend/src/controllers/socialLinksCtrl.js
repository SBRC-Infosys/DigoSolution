const asyncHandler = require('express-async-handler');
const { pool } = require('../config/db.js');
const { deleteCloudinaryImage, uploadOnCloudinary } = require('../services/cloudinary.js');
const mime = require('mime-types');

exports.addSocialLink = asyncHandler(async (req, res) => {
    const { platform_name, url } = req.body;
    let iconUrl = null;

    try {
        // Handle icon file upload
        if (req.file) {
            const mimeType = mime.lookup(req.file.originalname);

            // Check if it's an image
            if (mimeType && mimeType.startsWith('image/')) {
                const uploadResult = await uploadOnCloudinary(req.file.path);
                if (!uploadResult) {
                    return res.status(500).json({ message: 'Failed to upload icon' });
                }
                iconUrl = uploadResult.secure_url;
            } else {
                return res.status(400).json({ message: 'Unsupported file type. Only images are allowed.' });
            }
        } else if (req.body.icon) {
            
            iconUrl = req.body.icon;
        }

        const [result] = await pool.query(`
            INSERT INTO socialLinks (platform_name, url, icon)
            VALUES (?, ?, ?);
        `, [platform_name, url, iconUrl]);

        res.status(201).json({
            message: 'Social link added successfully',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add social link',
            error: error
        });
    }
});

exports.getAllSocialLinks = asyncHandler(async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM socialLinks;');
        res.status(200).json({
            message: 'Social links fetched successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch social links',
            error: error
        });
    }
});

exports.getSocialLinkById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('SELECT * FROM socialLinks WHERE id = ?;', [id]);

        if (result.length > 0) {
            res.status(200).json({
                message: 'Social link fetched successfully',
                data: result[0]
            });
        } else {
            res.status(404).json({
                message: 'Social link not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch social link',
            error: error
        });
    }
});


exports.updateSocialLinkById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { platform_name, url, icon } = req.body;
    let iconUrl = icon;
  
    try {
      // Fetch the existing social link
      const [existingLink] = await pool.query('SELECT * FROM socialLinks WHERE id = ?;', [id]);
      if (existingLink.length === 0) {
        return res.status(404).json({ message: 'Social link not found' });
      }
  
      const socialLink = existingLink[0];
  
      // Handle image update
      if (req.file) {
        const mimeType = mime.lookup(req.file.originalname);
        if (mimeType && mimeType.startsWith('image/')) {
          // Delete the old image from Cloudinary if it exists
          if (socialLink.icon) {
            await deleteCloudinaryImage(socialLink.icon); // Assuming this function uses the Cloudinary public ID to delete the image
          }
  
          // Upload the new image to Cloudinary
          const uploadResult = await uploadOnCloudinary(req.file.path);
          if (!uploadResult) {
            return res.status(500).json({ message: 'Failed to upload new icon' });
          }
          iconUrl = uploadResult.secure_url;
        } else {
          return res.status(400).json({ message: 'Unsupported file type. Only images are allowed.' });
        }
      } else if (!icon) {
        // If no new image is uploaded, retain the old image URL
        iconUrl = socialLink.icon;
      }
  
      // Update the social link in the database
      const [result] = await pool.query(`
        UPDATE socialLinks 
        SET 
          platform_name = COALESCE(?, platform_name),
          url = COALESCE(?, url),
          icon = COALESCE(?, icon)
        WHERE id = ?;
      `, [platform_name, url, iconUrl, id]);
  
      if (result.affectedRows > 0) {
        res.status(200).json({
          message: 'Social link updated successfully'
        });
      } else {
        res.status(500).json({
          message: 'Failed to update social link'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Failed to update social link',
        error: error.message
      });
    }
  });


exports.deleteSocialLinkById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM socialLinks WHERE id = ?;', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Social link deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'Social link not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete social link',
            error: error
        });
    }
});
