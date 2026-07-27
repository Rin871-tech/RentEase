const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable');
}

// Cache the connection across lambda invocations (prevents exhausting connections)
let cached = global._mangoConnection;
if (!cached) {
  cached = global._mangoConnection = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      // Recommended mongoose options
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then(m => m.connection);
  }

  cached.conn = await cached.promise;
  console.log(`✅ MongoDB Connected: ${cached.conn.host}`);
  return cached.conn;
}

module.exports = connectDB;