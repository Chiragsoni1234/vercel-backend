const cloudinary = require('../config/cloudinaryConfig');

exports.uploadImage = async (req, res, next) => {
    try {
        const file = req.files.image;
        const result = await cloudinary.uploader.upload(file.tempFilePath);

        res.status(200).json({ imageUrl: result.secure_url });
    } catch (error) {
        next(error);
    }
};