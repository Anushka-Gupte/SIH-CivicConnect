const express = require('express');
const multer = require('multer');
const router = express.Router();
const { createReport, getReports } = require('../controllers/reportController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), createReport);
router.get('/', getReports);

module.exports = router;
