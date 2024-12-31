const express = require("express");
const { upload } = require("../middlewares/multer.middleware.js");
const { createNewsEvents, deleteNewsEventsById, getNewsEventsById, getNewsEvents, updateNewsEventsById } = require("../controllers/news_eventsCtrl.js");

const router = express.Router();

router.get('/', getNewsEvents);

router.get('/:id', getNewsEventsById);

router.post('/add', upload.single('image'), createNewsEvents);

router.patch('/update/:id', upload.single('image'), updateNewsEventsById);

router.delete('/delete/:id', deleteNewsEventsById);

module.exports = router;
