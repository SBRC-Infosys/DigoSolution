const express = require("express");
const { upload } = require("../middlewares/multer.middleware.js");
const { createWhyChooseUs, deleteWhyChooseUsById, getAllWhyChooseUs, getWhyChooseUsById, updateWhyChooseUs } = require("../controllers/whyChooseUsCtrl.js");

const router = express.Router();

router.get('/', getAllWhyChooseUs);

router.get('/:id', getWhyChooseUsById);

router.post('/add', createWhyChooseUs); 

router.patch('/update/:id', updateWhyChooseUs); 

router.delete('/delete/:id', deleteWhyChooseUsById); 

module.exports = router;
