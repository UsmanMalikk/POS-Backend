const express = require('express');
const router = express.Router();
const multer = require('multer');
const {uploadFile} = require('../controllers/File');



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST route for file upload
router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
