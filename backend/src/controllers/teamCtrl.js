const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
const { db, pool } = require('../config/db.js');
const { sql } = require('drizzle-orm');
const { deleteCloudinaryImage, uploadOnCloudinary } = require('../services/cloudinary.js');


dotenv.config();

exports.getTeamMember = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      // Fetch the team member by ID
      const [teamMember] = await db.execute(sql`
        SELECT * FROM team WHERE id = ${id};
      `);
  
      if (teamMember.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Team member not found',
        });
      }
  
      res.json({
        status: 200,
        data: teamMember,
      });
  
    } catch (error) {
      console.error('Error fetching team member', error);
      res.status(500).json({ message: 'Failed to fetch team member', error: error.message });
    }
  });

exports.getTeamMembers = asyncHandler(async (req, res) => {
  
    try {
      // Fetch the team member by ID
      const [teamMember] = await db.execute(sql`
        SELECT * FROM team;
      `);
  
      if (teamMember.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Team member not found',
        });
      }
  
      res.json({
        status: 200,
        data: teamMember,
      });
  
    } catch (error) {
      console.error('Error fetching team member', error);
      res.status(500).json({ message: 'Failed to fetch team member', error: error.message });
    }
  });

  exports.addTeamMember = asyncHandler(async (req, res) => {
    const { name, email, phone, designation, bio } = req.body;
  
    try {
      // Check if a team member with the same email already exists
      const [existingMember] = await db.execute(sql`
        SELECT * FROM team WHERE email = ${email};
      `);
  
      if (existingMember.length > 0) {
        return res.status(409).json({
          status: 409,
          message: 'Email already exists',
        });
      }
  
      // Upload the image to Cloudinary if provided
      const img_url = req.file ? await uploadOnCloudinary(req.file.path) : null;
  
      // Insert the new team member, ensuring img_url, phone, and bio can be null
      const [result] = await db.execute(sql`
        INSERT INTO team (name, email, phone, designation, img_url, bio)
        VALUES (${name}, ${email}, ${phone || null}, ${designation}, ${img_url ? img_url.secure_url : null}, ${bio || null});
      `);
  
      const insertedId = result?.insertId;
      if (!insertedId) {
        console.error('InsertId is undefined or null:', result);
        throw new Error('Failed to retrieve insertId');
      }

      if(result.affectedRows == 0 ){
        deleteCloudinaryImage(img_url);
      }
  
      // Fetch the newly inserted record
      const [newTeamMember] = await db.execute(sql`
        SELECT * FROM team WHERE id = ${insertedId};
      `);
  
      res.json({
        status: 200,
        message: 'Successful',
        data: newTeamMember,
      });
  
    } catch (error) {
      console.error('Error adding team member', error);
      res.status(500).json({ message: 'Failed to add team member', error: error.message });
    }
  });
  

  exports.updateTeamMember = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, designation, bio } = req.body;

    try {
        // Fetch existing data
        const [existingMember] = await pool.query(
            'SELECT * FROM team WHERE id = ?',
            [id]
        );
        if (existingMember.length === 0) {
            return res.status(404).json({ status: 404, message: 'Team member not found' });
        }
        let img_url = existingMember[0].img_url;

        // Handle image update if file is provided
        if (req.file) {
            const newImage = await uploadOnCloudinary(req.file.path);
            if (!newImage) {
                return res.status(500).json({ message: 'Failed to upload new image' });
            }
            if (img_url) await deleteCloudinaryImage(img_url);
            img_url = newImage.secure_url;
        }

        // Construct the SQL query
        const updateSql = `
            UPDATE team
            SET 
                name = COALESCE(?, name),
                email = COALESCE(?, email),
                phone = COALESCE(?, phone),
                designation = COALESCE(?, designation),
                img_url = COALESCE(?, img_url),
                bio = COALESCE(?, bio)
            WHERE id = ?`;

        const params = [name, email, phone, designation, img_url, bio, id]; // Bind values

        const [result] = await pool.query(updateSql, params);

        if (result.affectedRows === 0) {
            
            return res.status(404).json({ status: 404, message: 'Team member not found' });
        }

        // Fetch updated data
        const [updatedTeamMember] = await pool.query(
            'SELECT * FROM team WHERE id = ?',
            [id]
        );
        res.json({ status: 200, data: updatedTeamMember });

    } catch (error) {
        console.error('Error updating team member:', error);
        res.status(500).json({ message: 'Failed to update', error: error.message });
    }
});

  exports.deleteTeamMember = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      // Fetch the existing team member's details
      const [existingMember] = await db.execute(sql`
        SELECT * FROM team WHERE id = ${id};
      `);
  
      if (existingMember.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Team member not found',
        });
      }
  
      const img_url = existingMember[0].img_url;
  
      // Delete the team member from the database
      const result = await db.execute(sql`
        DELETE FROM team WHERE id = ${id};
      `);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Team member not found',
        });
      }
  
      // If the team member has an image, delete it from Cloudinary
      if (img_url) {
        // Extracting the public_id correctly
        await deleteCloudinaryImage(img_url)
    }
  
      res.json({
        status: 200,
        message: 'Team member deleted successfully',
      });
  
    } catch (error) {
      console.error('Error deleting team member', error);
      res.status(500).json({ message: 'Failed to delete team member', error: error.message });
    }
  });
  