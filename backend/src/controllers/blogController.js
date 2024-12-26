const Blog = require('../models/blogModel');

// Get all blogs
exports.getAllBlogs = (req, res) => {
    Blog.getAllBlogs((err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
};

// Get blog by ID
exports.getBlogById = (req, res) => {
    const id = req.params.id;
    Blog.getBlogById(id, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(results[0]);
    });
};

// Create a new blog
exports.createBlog = (req, res) => {
    const { title, content, categoryId, imgUrl, authorId, publishedAt } = req.body;
    Blog.createBlog(title, content, categoryId, imgUrl, authorId, publishedAt, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: 'Blog created successfully', id: results.insertId });
    });
};

// Update a blog
exports.updateBlog = (req, res) => {
    const id = req.params.id;
    const { title, content, categoryId, imgUrl, authorId, publishedAt } = req.body;
    Blog.updateBlog(id, title, content, categoryId, imgUrl, authorId, publishedAt, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json({ message: 'Blog updated successfully' });
    });
};

// Delete a blog
exports.deleteBlog = (req, res) => {
    const id = req.params.id;
    Blog.deleteBlog(id, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json({ message: 'Blog deleted successfully' });
    });
};
