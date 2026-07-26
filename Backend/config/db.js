const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('⚠️  MONGODB_URI is not set. Skipping database connection.');
    return null;
  }

  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`⚠️  MongoDB connection failed: ${error.message}`);
    if (process.env.VERCEL !== '1') {
      process.exit(1);
    }
    return null;
  }
};

module.exports = connectDB;