const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// Middleware (BEFORE routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app'  // Update this
  ],
  credentials: true
}));

// ============= HEALTH CHECK (works immediately) =============
app.get('/api/health', (req, res) => {
  res.json({ 
    message: '✅ RentEase Backend is running!',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: '✅ API is working!',
    environment: process.env.NODE_ENV || 'development'
  });
});

// ============= CONNECT TO DB (non-blocking) =============
connectDB().catch(err => {
  console.error('❌ Database connection failed:', err);
  // App still runs, DB error logged
});

// ============= ROUTES =============
app.use('/api/admin', require('./routes/admin'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// ============= ERROR HANDLER =============
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({ 
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// ============= 404 HANDLER =============
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ============= START SERVER (local only) =============
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

// ============= EXPORT FOR VERCEL =============
module.exports = app;