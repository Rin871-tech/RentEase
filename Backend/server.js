const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// Connect to database without blocking app startup
connectDB().catch(() => {});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: '✅ RentEase Backend is running!' });
});

app.get('/', (req, res) => {
  res.json({ message: '✅ API is working!' });
});

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`✅ MongoDB Connected`);
  });
}

// Export for Vercel
module.exports = app;