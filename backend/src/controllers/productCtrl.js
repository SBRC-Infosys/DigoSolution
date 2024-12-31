const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
const { db } = require('../config/db.js');
const { sql } = require('drizzle-orm');
const { deleteCloudinaryImage, uploadOnCloudinary } = require('../services/cloudinary.js');
const { pool } = require('../config/db.js');


dotenv.config();

exports.addProduct = asyncHandler(async (req, res, next) => {
  const { category_id, name, description, regular_price, sale_price } = req.body;

  try {
      // Upload the image to Cloudinary if provided
      let img_url = null;
      if (req.file) {
          const uploadResult = await uploadOnCloudinary(req.file.path);
          img_url = uploadResult.secure_url; // Extract only the secure URL
      }

      let insertSql, queryParams;

      // Check if sale_price is provided
      if (sale_price) {
        insertSql = `
          INSERT INTO products (category_id, name, description, regular_price, sale_price, img_url)
          VALUES (?, ?, ?, ?, ?, ?);
        `;
        queryParams = [category_id, name, description, regular_price, sale_price, img_url];
      } else {
        insertSql = `
          INSERT INTO products (category_id, name, description, regular_price, img_url)
          VALUES (?, ?, ?, ?, ?);
        `;
        queryParams = [category_id, name, description, regular_price, img_url];
      }

      // Insert the product into the database
      const [result] = await pool.query(insertSql, queryParams);

      // Extract the inserted ID from the result
      const insertedId = result.insertId;

      // Fetch the inserted product details
      const fetchProductSql = `
          SELECT * FROM products WHERE id = ?;
      `;
      const [productRows] = await pool.query(fetchProductSql, [insertedId]);

      // Send response with the product details
      res.json({
          status: 200,
          message: 'Success',
          product: productRows[0]
      });

  } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Failed to add the product' });
  }
});

exports.getProducts = asyncHandler(async (req, res) => {
    
    try {
      const [rows] = await db.execute(sql`
        SELECT * FROM products;
      `);
  
      res.json({
        status: 200,
        message: 'Products fetched successfully',
        products: rows,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Failed to fetch products' });
    }
  });

  exports.getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const [rows] = await db.execute(sql`
        SELECT * FROM products WHERE id = ${id};
      `);
  
      if (rows.length > 0) {
        res.json({
          status: 200,
          message: 'Product fetched successfully',
          product: rows[0],
        });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Failed to fetch product' });
    }
  });

  exports.updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { category_id, name, description, regular_price, sale_price } = req.body;
  
    try {
        // Handle image upload if a new image is provided
        let img_url = req.body.img_url;
        if (req.file) {
            const uploadResult = await uploadOnCloudinary(req.file.path);
            img_url = uploadResult.secure_url; // Extract only the secure URL
        }

        // Prepare dynamic fields for the SQL query
        const fields = [];
        const values = [];

        if (category_id) {
            fields.push('category_id = ?');
            values.push(category_id);
        }
        if (name) {
            fields.push('name = ?');
            values.push(name);
        }
        if (description) {
            fields.push('description = ?');
            values.push(description);
        }
        if (regular_price) {
            fields.push('regular_price = ?');
            values.push(regular_price);
        }
        if (sale_price) {
            fields.push('sale_price = ?');
            values.push(sale_price);
        }
        if (img_url) {
            fields.push('img_url = ?');
            values.push(img_url);
        }

        // Check if there are fields to update
        if (fields.length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        // Construct the dynamic SQL query
        const updateSql = `
            UPDATE products
            SET ${fields.join(', ')}
            WHERE id = ?;
        `;
        values.push(id); // Add the id as the last value for the WHERE clause

        // Execute the update query
        const [result] = await pool.query(updateSql, values);

        if (result.affectedRows > 0) {
            // Fetch the updated product details
            const fetchProductSql = `
                SELECT * FROM products WHERE id = ?;
            `;
            const [rows] = await pool.query(fetchProductSql, [id]);

            res.json({
                status: 200,
                message: 'Product updated successfully',
                product: rows[0],
            });
        } else {
            deleteCloudinaryImage(img_url);
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Failed to update product' });
    }
});

  exports.deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await db.execute(sql`
        DELETE FROM products WHERE id = ${id};
      `);
  
      if (result.affectedRows > 0) {
        res.json({
          status: 200,
          message: 'Product deleted successfully',
        });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Failed to delete product' });
    }
  });

exports.addProductCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  try {
    const product_cat = await db.execute(sql`
        INSERT INTO product_category (name)
        VALUES (${name});
        `)

    res.json({
      status: 200,
      message: 'Success',
    });

  } catch (error) {
    console.error('Error adding product category:', error);
    res.status(500).json({ message: 'Failed to add the product category' });
  }
});

exports.getProductCategories = asyncHandler(async (req, res) => {
   
    try {
        const [rows] = await db.execute(sql`
            SELECT * FROM product_category;
            `);

        if (rows.length === 0) {
            console.log('No categories found.');
            return res.status(404).json({
                status: 404,
                message: 'No categories found',
            });
        }

        // console.log('Categories fetched:', rows);
        res.json({
            status: 200,
            message: 'Product categories fetched successfully',
            categories: rows,
        });
    } catch (error) {
        console.error('Error fetching product categories:', error.message);
        res.status(500).json({ message: 'Failed to fetch product categories' });
    }
});


  exports.getProductCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const [rows] = await db.execute(sql`
        SELECT * FROM product_category WHERE id = ${id};
      `);
  
      if (rows.length > 0) {
        res.json({
          status: 200,
          message: 'Product category fetched successfully',
          category: rows[0],
        });
      } else {
        res.status(404).json({ message: 'Product category not found' });
      }
    } catch (error) {
      console.error('Error fetching product category:', error);
      res.status(500).json({ message: 'Failed to fetch product category' });
    }
  });


  exports.updateProductCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    try {
      const [result] = await db.execute(sql`
        UPDATE product_category
        SET name = ${name}
        WHERE id = ${id};
      `);
  
      if (result.affectedRows > 0) {
        // Fetch the updated product category details
        const [rows] = await db.execute(sql`
          SELECT * FROM product_category WHERE id = ${id};
        `);
  
        res.json({
          status: 200,
          message: 'Product category updated successfully',
          category: rows[0],
        });
      } else {
        res.status(404).json({ message: 'Product category not found' });
      }
    } catch (error) {
      console.error('Error updating product category:', error);
      res.status(500).json({ message: 'Failed to update product category' });
    }
  });


exports.deleteProductCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute(sql`
      DELETE FROM product_category WHERE id = ${id};
    `);

    if (result.affectedRows > 0) {
      res.json({
        status: 200,
        message: 'Product category deleted successfully',
      });
    } else {
      res.status(404).json({ message: 'Product category not found' });
    }
  } catch (error) {
    console.error('Error deleting product category:', error);
    res.status(500).json({ message: 'Failed to delete product category' });
  }
});