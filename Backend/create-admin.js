require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');

connectDB();

async function createAdmin() {
  try {
    const Admin = require('./models/Admin');

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: 'admin@rentease.com' });
    if (adminExists) {
      console.log('✅ Super-admin already exists');
      process.exit(0);
    }

    // Create super-admin
    const admin = await Admin.create({
      email: 'admin@rentease.com',
      password: 'admin123',
      name: 'Super Admin',
      role: 'super-admin',
      permissions: ['all'],
    });

    console.log('✅ Super-admin created successfully!');
    console.log('📧 Email: admin@rentease.com');
    console.log('🔐 Password: admin123');
    console.log('\nPlease change the password in production!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
