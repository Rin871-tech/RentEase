// api/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('../config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/admin', require('../routes/admin'));
app.use('/auth', require('../routes/auth'));
app.use('/products', require('../routes/products'));
app.use('/orders', require('../routes/orders'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: '✅ RentEase Backend is running!' });
});

// Export for Vercel
module.exports = app;