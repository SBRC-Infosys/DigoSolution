const express = require("express");
const { upload } = require("../middlewares/multer.middleware.js");
const { createBlog, deleteBlogById, getBlogById, getBlogs, updateBlogById } = require("../controllers/blogCtrl.js");

const router = express.Router();

router.get('/', getBlogs);

router.get('/:id', getBlogById);

router.post('/add', upload.single('image'), createBlog);

router.patch('/update/:id', upload.single('image'), updateBlogById);

router.delete('/delete/:id', deleteBlogById);

module.exports = router;
