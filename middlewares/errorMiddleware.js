// middlewares/errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: err.message || 'Server Error' });
};

module.exports = errorMiddleware;
