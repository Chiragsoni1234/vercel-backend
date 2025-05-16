const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const imageRoutes = require('./routes/imageRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const cors = require('cors'); 
const app = express();

// Load Config
dotenv.config();

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

// Routes
app.use('/api/images', imageRoutes);

// Error Middleware
app.use(errorMiddleware);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('DB Connection Error:', err);
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
