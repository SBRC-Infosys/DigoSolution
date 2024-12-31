const express = require("express");
const { upload } = require("../middlewares/multer.middleware.js");
const { createNewsEventCategory, deleteNewsEventCategoryById, getNewsEventCategories, getNewsEventCategoryById, updateNewsEventCategoryById } = require("../controllers/newsEventsCategoriesCtrl.js");

const router = express.Router();

router.get('/', getNewsEventCategories);

router.get('/:id', getNewsEventCategoryById);

router.post('/add', createNewsEventCategory);

router.patch('/update/:id', updateNewsEventCategoryById);

router.delete('/delete/:id', deleteNewsEventCategoryById);

module.exports = router;
