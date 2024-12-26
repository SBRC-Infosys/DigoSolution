const express = require('express');
const router = express.Router();
const blogCategoryController = require('../controllers/blogCategoryController');

router.get('/', blogCategoryController.getAllCategories);
router.get('/:id', blogCategoryController.getCategoryById);
router.post('/', blogCategoryController.createCategory);
router.put('/:id', blogCategoryController.updateCategory);
router.delete('/:id', blogCategoryController.deleteCategory);

module.exports = router;
