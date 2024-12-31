const express = require("express");
const { upload } = require("../middlewares/multer.middleware.js");
const { createCompany, deleteCompanyById, getCompany, getCompanyById, updateCompanyById } = require("../controllers/companyCtrl.js");

const router = express.Router();

router.get('/fetch', getCompany);

router.get('/fetch/:id', getCompanyById);

router.post('/add', upload.single('image'), createCompany);

router.patch('/:id', upload.single('image'), updateCompanyById);

router.delete('/:id', deleteCompanyById);

module.exports = router;
