const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/uploadController');

router.post('/image-upload', uploadImage);

module.exports = router;