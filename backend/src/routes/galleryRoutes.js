const express = require("express");
const { upload } = require("../middlewares/multer.middleware.js");
const { addToGallery, deleteGalleryItemById, getAllGalleryItems, getGalleryItemById, updateGalleryItemById } = require("../controllers/galleryCtrl.js");

const router = express.Router();

router.get('/', getAllGalleryItems);

router.get('/:id', getGalleryItemById);

router.post('/add', upload.single('image'), addToGallery);

router.patch('/update/:id', upload.single('image'), updateGalleryItemById);

router.delete('/delete/:id', deleteGalleryItemById);

module.exports = router;
