const axios = require('axios');
const FormData = require('form-data');
const Image = require('../models/imageModel');


// 🖼️ Fetch Image by ID
exports.getImageById = async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.status(200).json({
      success: true,
      imageUrl: image.imageUrl,
      prompt: image.prompt
    });
  } catch (error) {
    console.error('Error fetching image:', error.message);
    next(error);
  }
};


exports.generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // 📝 Create FormData and append prompt
    const formData = new FormData();
    formData.append("prompt", prompt);

    // 🔄 API Call to Clipdrop for Text-to-Image generation
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer", // Ensures we get back raw image data
      }
    );

    // 🔄 Convert image buffer to Base64 and format it
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    // 💾 Save to MongoDB
    const image = new Image({ prompt, imageUrl: resultImage });
    await image.save();

    // 📡 Respond with the image URL and MongoDB ID
    res.status(200).json({
      success: true,
      message: "Image generated successfully",
      imageId: image._id,
      imageUrl: resultImage,
    });

  } catch (error) {
    console.error("Error generating image:", error.response ? error.response.data : error.message);
    next(error);
  }
};
