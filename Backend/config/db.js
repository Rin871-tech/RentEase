const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('⚠️ MONGODB_URI not set in environment');
      return; // Don't crash if DB isn't configured
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    // Don't crash - let app run without DB (for now)
    // Delete this if you MUST have DB
    // process.exit(1);
  }
};

module.exports = connectDB;