const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('./config/db');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'Queen Bed',
    description: 'Comfortable queen size bed with storage',
    category: 'bed',
    monthlyPrice: 1500,
    securityDeposit: 5000,
    quantity: 5,
    available: true,
    tenureOptions: [3, 6, 12],
  },
  {
    name: 'L-Shaped Sofa',
    description: 'Modern L-shaped sofa for living room',
    category: 'sofa',
    monthlyPrice: 2500,
    securityDeposit: 8000,
    quantity: 3,
    available: true,
    tenureOptions: [3, 6, 12],
  },
  {
    name: 'Wooden Dining Table',
    description: 'Wooden dining table for 6 people',
    category: 'table',
    monthlyPrice: 1000,
    securityDeposit: 4000,
    quantity: 4,
    available: true,
    tenureOptions: [3, 6, 12],
  },
  {
    name: 'Refrigerator (Double Door)',
    description: 'Energy-efficient double door refrigerator',
    category: 'fridge',
    monthlyPrice: 800,
    securityDeposit: 5000,
    quantity: 2,
    available: true,
    tenureOptions: [3, 6, 12],
  },
  {
    name: 'Washing Machine (Automatic)',
    description: 'Automatic front-load washing machine',
    category: 'washing-machine',
    monthlyPrice: 600,
    securityDeposit: 4000,
    quantity: 2,
    available: true,
    tenureOptions: [3, 6, 12],
  },
  {
    name: '55" Smart TV',
    description: '55 inch 4K Smart LED TV',
    category: 'tv',
    monthlyPrice: 1200,
    securityDeposit: 6000,
    quantity: 3,
    available: true,
    tenureOptions: [3, 6, 12],
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    await Product.deleteMany({}); // Clear existing products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ ${products.length} products added to database!`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();