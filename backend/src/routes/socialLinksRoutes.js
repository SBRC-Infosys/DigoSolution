const express = require("express");
const { upload } = require("../middlewares/multer.middleware.js");
const { 
  addSocialLink, 
  deleteSocialLinkById, 
  getAllSocialLinks, 
  getSocialLinkById, 
  updateSocialLinkById 
} = require("../controllers/socialLinksCtrl.js");

const router = express.Router();

router.get('/', getAllSocialLinks);

router.get('/:id', getSocialLinkById);

router.post('/add', upload.single('image'), addSocialLink);

router.patch('/update/:id', upload.single('image'), updateSocialLinkById);

router.delete('/delete/:id', deleteSocialLinkById);

module.exports = router;
