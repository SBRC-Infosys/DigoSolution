const db = require('../config/db');

// Get all blogs with category and author details
exports.getAllBlogs = (callback) => {
    const query = `
        SELECT 
            blog.id, blog.title, blog.content, blog.img_url, blog.published_at, blog.created_at, blog.updated_at,
            blogCategories.name AS category_name, users.username AS author_name
        FROM blog
        LEFT JOIN blogCategories ON blog.category_id = blogCategories.id
        LEFT JOIN users ON blog.author_id = users.id
    `;
    db.query(query, callback);
};

// Get blog by ID
exports.getBlogById = (id, callback) => {
    const query = `
        SELECT 
            blog.id, blog.title, blog.content, blog.img_url, blog.published_at, blog.created_at, blog.updated_at,
            blogCategories.name AS category_name, users.username AS author_name
        FROM blog
        LEFT JOIN blogCategories ON blog.category_id = blogCategories.id
        LEFT JOIN users ON blog.author_id = users.id
        WHERE blog.id = ?
    `;
    db.query(query, [id], callback);
};


// Create a new blog
exports.createBlog = (title, content, categoryId, imgUrl, authorId, publishedAt, callback) => {
    const query = `
        INSERT INTO blog (title, content, category_id, img_url, author_id, published_at) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [title, content, categoryId, imgUrl, authorId, publishedAt], callback);
};

// Update a blog
exports.updateBlog = (id, title, content, categoryId, imgUrl, authorId, publishedAt, callback) => {
    const query = `
        UPDATE blog 
        SET title = ?, content = ?, category_id = ?, img_url = ?, author_id = ?, published_at = ? 
        WHERE id = ?
    `;
    db.query(query, [title, content, categoryId, imgUrl, authorId, publishedAt, id], callback);
};

// Delete a blog
exports.deleteBlog = (id, callback) => {
    const query = 'DELETE FROM blog WHERE id = ?';
    db.query(query, [id], callback);
};
