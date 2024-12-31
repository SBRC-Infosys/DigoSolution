const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const { deleteCloudinaryImage, uploadOnCloudinary } = require("../services/cloudinary.js");
const { pool } = require("../config/db.js");

// Helper function to handle SQL queries with dynamic fields
const buildUpdateQuery = (fields, values, table, idField = "id") => {
  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const query = `UPDATE ${table} SET ${setClause} WHERE ${idField} = ?`;
  return query;
};

const createBannerImage = asyncHandler(async (req, res) => {
    const { title, description, action_button_url, button_name } = req.body;
  
    let img_url = null;
    
    try {
      if (req.file) {
        const uploadResult = await uploadOnCloudinary(req.file.path);
        if (!uploadResult) {
          return res
            .status(500)
            .json({ message: "Failed to upload thumbnail image" });
        }
        img_url = uploadResult.secure_url;
      }
  
      // Insert data into the `banner_image` table with all URLs from `banner_img_url`
      const [result] = await pool.query(
        `
              INSERT INTO banner_image (title, description, img_url, action_button_url, button_name)
              VALUES (?, ?, ?, ?, ?);
          `,
        [title, description, img_url, action_button_url, button_name]
      );
  
      if (result.affectedRows > 0) {
        res.status(201).json({
          status: 201,
          message: "Banner image created successfully",
          id: result.insertId,
        });
      } else {
        if (img_url) await deleteCloudinaryImage(img_url);
        res.status(500).json({
          message: "Error occurred while creating the banner/slider",
        });
      }
    } catch (error) {
      if (img_url) await deleteCloudinaryImage(img_url);
      console.error("Error creating banner image:", error.message);
      res.status(500).json({ message: "Failed to create banner image" });
    }
});

const getBannerImage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM banner_image;");

    if (rows.length === 0) {
      return res.status(404).json({ message: "Banner image not found" });
    }

    res.json({
      status: 200,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching banner image:", error);
    res.status(500).json({ message: "Failed to fetch banner image" });
  }
});

const updateBannerImageById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, action_button_url, button_name } = req.body;
  const new_img_file = req.file;

  let img_url = null;
  try {

    if (new_img_file) {
      const uploadResult = await uploadOnCloudinary(new_img_file.path);
      if (!uploadResult) {
        return res
          .status(500)
          .json({ message: "Failed to upload thumbnail image" });
      }
      img_url = uploadResult.secure_url;
    }

    const fields = [];
    const values = [];

    if (title) fields.push("title"), values.push(title);
    if (description) fields.push("description"), values.push(description);
    if (action_button_url)
      fields.push("action_button_url"), values.push(action_button_url);
    if (button_name) fields.push("button_name"), values.push(button_name);

    if (img_url) fields.push("img_url"), values.push(img_url);

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    const query = buildUpdateQuery(fields, values, "banner_image");
    values.push(id);

    const [updateResult] = await pool.query(query, values);

    if (updateResult.affectedRows > 0) {
      const [updatedRows] = await pool.query(
        "SELECT * FROM banner_image WHERE id = ?;",
        [id]
      );
      res.json({
        status: 200,
        message: "Banner image updated successfully",
        data: updatedRows[0],
      });
    } else {
      if (img_url) await deleteCloudinaryImage(img_url);
      res.status(404).json({ message: "Banner image not found" });
    }
  } catch (error) {
    if (img_url) await deleteCloudinaryImage(img_url);
    console.error("Error updating banner image:", error);
    res.status(500).json({ message: "Failed to update banner image" });
  }
});

// Delete banner image URL by ID
const deleteBannerImgUrlById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the NewsEvents exists
    const [existingNewsEvents] = await pool.query(
      `SELECT * FROM banner_image WHERE id = ?;`,
      [id]
    );
    if (existingNewsEvents.length === 0) {
      return res.status(404).json({ message: "banner/slider not found" });
    }

    // Delete the image from Cloudinary
    if (existingNewsEvents[0].img_url) {
      await deleteCloudinaryImage(existingNewsEvents[0].img_url);
    }

    const [result] = await pool.query(`DELETE FROM banner_image WHERE id = ?;`, [
      id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Failed to delete banner/slider" });
    } else {
      res.status(200).json({
        message: "Banner/Slider deleted successfully",
        id: id,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete the banner/slider",
      error: error,
    });
  }
});

module.exports = {
  createBannerImage,
  getBannerImage,
  updateBannerImageById,
  deleteBannerImgUrlById,
};
