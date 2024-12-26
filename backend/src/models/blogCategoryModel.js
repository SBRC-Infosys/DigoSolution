const db = require('../config/db');

// Get all categories
exports.getAllCategories = (callback) => {
    const query = 'SELECT * FROM blogCategories';
    db.query(query, callback);
};

// Get category by ID
exports.getCategoryById = (id, callback) => {
    const query = 'SELECT * FROM blogCategories WHERE id = ?';
    db.query(query, [id], callback);
};

// Create a new category
exports.createCategory = (name, description, callback) => {
    const query = 'INSERT INTO blogCategories (name, description) VALUES (?, ?)';
    db.query(query, [name, description], callback);
};

// Update a category
exports.updateCategory = (id, name, description, callback) => {
    const query = 'UPDATE blogCategories SET name = ?, description = ? WHERE id = ?';
    db.query(query, [name, description, id], callback);
};

// Delete a category
exports.deleteCategory = (id, callback) => {
    const query = 'DELETE FROM blogCategories WHERE id = ?';
    db.query(query, [id], callback);
};
