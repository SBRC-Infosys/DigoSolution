const asyncHandler = require("express-async-handler");
const { pool } = require("../config/db.js");
const {
  deleteCloudinaryImage,
  uploadOnCloudinary,
} = require("../services/cloudinary.js");

exports.createBlog = asyncHandler(async (req, res) => {
  const { title, category_id, content, author_id, published_at } = req.body;
  let img_url = null;

  try {
    // Upload the image to Cloudinary if provided
    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      if (!uploadResult) {
        return res
          .status(500)
          .json({ message: "Failed to upload thumbnail image" });
      }
      img_url = uploadResult.secure_url;
    }

    const [result] = await pool.query(
      `
            INSERT INTO blog (title, category_id, content, author_id, img_url, published_at)
            VALUES (?, ?, ?, ?, ?, ?);
        `,
      [title, category_id, content, author_id, img_url, published_at]
    );

    if (result.affectedRows === 0) {
      await deleteCloudinaryImage(img_url);
    } else {
      res.status(201).json({
        status: 201,
        message: "Blog created successfully",
        id: result.insertId,
      });
    }
  } catch (error) {
    await deleteCloudinaryImage(img_url);
    res.status(404).json({
      message: "Failed to upload the blog",
      error: error,
    });
  }
});

exports.getBlogs = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Construct the SQL query with pagination, limit, and search filter
    const query = `
      SELECT * FROM blog
      WHERE title LIKE ? OR content LIKE ?
      LIMIT ? OFFSET ?;
    `;

    // Execute the query with search, limit, and offset parameters
    const [result] = await pool.query(query, [
      `%${search}%`,
      `%${search}%`,
      parseInt(limit),
      parseInt(offset),
    ]);

    // Query to count the total number of blogs that match the search criteria
    const countQuery = `
      SELECT COUNT(*) as total FROM blog
      WHERE title LIKE ? OR content LIKE ?;
    `;
    const [countResult] = await pool.query(countQuery, [
      `%${search}%`,
      `%${search}%`,
    ]);

    const totalBlogs = countResult[0].total;
    const totalPages = Math.ceil(totalBlogs / limit);

    if (result.length > 0) {
      res.status(200).json({
        message: "Success",
        data: result,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: totalPages,
        totalBlogs: totalBlogs,
      });
    } else {
      res.status(404).json({
        message: "No blogs found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch the blogs",
      error: error.message,
    });
  }
});

exports.getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(`SELECT * FROM blog WHERE id = ?;`, [id]);
    if (result.length > 0) {
      res.status(200).json({
        message: "Success",
        data: result,
      });
    } else {
      res.status(404).json({
        message: "Could not find the blog",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Failed to fetch the blog",
      error: error,
    });
  }
});

exports.deleteBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const [existingBlog] = await pool.query(
      `SELECT * FROM blog WHERE id = ?;`,
      [id]
    );
    if (existingBlog.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (existingBlog[0].img_url) {
      await deleteCloudinaryImage(existingBlog[0].img_url);
    }

    const [result] = await pool.query(`DELETE FROM blog WHERE id = ?;`, [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Failed to delete blog" });
    } else {
      res.status(200).json({
        message: "Blog deleted successfully",
        id: id,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete the blog",
      error: error,
    });
  }
});

exports.updateBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, category_id, content, author_id, published_at } = req.body;
  let img_url = null;

  try {
    const [existingBlog] = await pool.query(
      `SELECT * FROM blog WHERE id = ?;`,
      [id]
    );
    if (existingBlog.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      if (!uploadResult) {
        return res
          .status(500)
          .json({ message: "Failed to upload thumbnail image" });
      }
      img_url = uploadResult.secure_url;

      if (existingBlog[0].img_url) {
        await deleteCloudinaryImage(existingBlog[0].img_url);
      }
    } else {
      img_url = existingBlog[0].img_url;
    }

    const [result] = await pool.query(
      `
            UPDATE blog 
            SET 
                title = COALESCE(?, title),
                category_id = COALESCE(?, category_id),
                content = COALESCE(?, content),
                author_id = COALESCE(?, author_id),
                img_url = COALESCE(?, img_url),
                published_at = COALESCE(?, published_at),
                updated_at = NOW()
            WHERE id = ?;
        `,
      [title, category_id, content, author_id, img_url, published_at, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Failed to update blog" });
    } else {
      res.status(200).json({
        message: "Blog updated successfully",
        id: id,
      });
    }
  } catch (error) {
    if (img_url && img_url !== existingBlog[0].img_url) {
      await deleteCloudinaryImage(img_url);
    }
    res.status(500).json({
      message: "Failed to update the blog",
      error: error,
    });
  }
});
