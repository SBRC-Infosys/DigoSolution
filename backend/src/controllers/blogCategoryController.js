const BlogCategory = require('../models/blogCategoryModel');

// Get all categories
exports.getAllCategories = (req, res) => {
    BlogCategory.getAllCategories((err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
};

// Get category by ID
exports.getCategoryById = (req, res) => {
    const id = req.params.id;
    BlogCategory.getCategoryById(id, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(results[0]);
    });
};

// Create a new category
exports.createCategory = (req, res) => {
    const { name, description } = req.body;
    BlogCategory.createCategory(name, description, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: 'Category created successfully', id: results.insertId });
    });
};

// Update a category
exports.updateCategory = (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;
    BlogCategory.updateCategory(id, name, description, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category updated successfully' });
    });
};

// Delete a category
exports.deleteCategory = (req, res) => {
    const id = req.params.id;
    BlogCategory.deleteCategory(id, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category deleted successfully' });
    });
};
