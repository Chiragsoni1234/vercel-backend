const express = require('express');
const { generateImage, getImageById } = require('../controllers/imageController');

const router = express.Router();

// 🎯 Route to generate image
router.post('/generate', generateImage);

// 🎯 Route to get image by ID
router.get('/:id', getImageById);


module.exports = router;
