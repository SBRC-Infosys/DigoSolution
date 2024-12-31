const express = require("express");
const { upload } = require("../middlewares/multer.middleware.js");
const { createBannerImage, deleteBannerImgUrlById, getBannerImage, updateBannerImageById } = require("../controllers/banner_imageCtrl.js");

const router = express.Router();

router.get('/', getBannerImage);

router.post('/add', upload.single('image'), createBannerImage); // Add image upload

router.patch('/:id', upload.single('image'), updateBannerImageById); // Add image upload

router.delete('/:id', deleteBannerImgUrlById);

module.exports = router;
