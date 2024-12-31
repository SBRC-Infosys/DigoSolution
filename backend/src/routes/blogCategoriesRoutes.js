const express = require("express");
const { createBlogCategory, deleteBlogCategoryById, getBlogCategories, getBlogCategoryById, updateBlogCategoryById } = require("../controllers/blogCategories.js");

const router = express.Router();

router.get('/', getBlogCategories);

router.get('/:id', getBlogCategoryById);

router.post('/add', createBlogCategory);

router.patch('/update/:id', updateBlogCategoryById);

router.delete('/delete/:id', deleteBlogCategoryById);

module.exports = router;
