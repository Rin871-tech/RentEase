const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('./config/db');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'Queen Bed',
    description: 'Comfortable queen size bed with storage and premium mattress',
    category: 'bed',
    monthlyPrice: 1500,
    securityDeposit: 5000,
    quantity: 5,
    available: true,
    tenureOptions: [3, 6, 12],
    image: 'https://images.unsplash.com/photo-1505693314967-38190ff929c5?w=800&q=80',
    condition: 'new',
  },
  {
    name: 'L-Shaped Sofa',
    description: 'Modern L-shaped sofa perfect for living room with comfortable seating',
    category: 'sofa',
    monthlyPrice: 2500,
    securityDeposit: 8000,
    quantity: 3,
    available: true,
    tenureOptions: [3, 6, 12],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    condition: 'good',
  },
  {
    name: 'Wooden Dining Table',
    description: 'Premium wooden dining table designed for 6 people',
    category: 'table',
    monthlyPrice: 1000,
    securityDeposit: 4000,
    quantity: 4,
    available: true,
    tenureOptions: [3, 6, 12],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&crop=entropy&cs=tinysrgb',
    condition: 'good',
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Professional ergonomic office chair with lumbar support',
    category: 'chair',
    monthlyPrice: 800,
    securityDeposit: 3000,
    quantity: 6,
    available: true,
    tenureOptions: [3, 6, 12],
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80',
    condition: 'good',
  },
  {
    name: 'Refrigerator (Double Door)',
    description: 'Energy-efficient double door refrigerator with frost-free technology',
    category: 'fridge',
    monthlyPrice: 800,
    securityDeposit: 5000,
    quantity: 2,
    available: true,
    tenureOptions: [3, 6, 12],
    image: 'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=800&q=80',
    condition: 'new',
  },
  {
    name: 'Washing Machine (Automatic)',
    description: 'Automatic front-load washing machine with 7kg capacity',
    category: 'washing-machine',
    monthlyPrice: 600,
    securityDeposit: 4000,
    quantity: 2,
    available: true,
    tenureOptions: [3, 6, 12],
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=800&q=80',
    condition: 'good',
  },
  {
    name: '55" Smart TV',
    description: '55 inch 4K Smart LED TV with HDR and streaming apps',
    category: 'tv',
    monthlyPrice: 1200,
    securityDeposit: 6000,
    quantity: 3,
    available: true,
    tenureOptions: [3, 6, 12],
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=800&q=80',
    condition: 'new',
  },
  {
    name: 'AC Split Unit',
    description: '1.5 Ton inverter AC with energy efficient cooling',
    category: 'ac',
    monthlyPrice: 900,
    securityDeposit: 5500,
    quantity: 2,
    available: true,
    tenureOptions: [3, 6, 12],
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
    condition: 'good',
  },
  {
    name: 'Coffee Table',
    description: 'Modern glass and wood coffee table for living room',
    category: 'table',
    monthlyPrice: 600,
    securityDeposit: 2500,
    quantity: 5,
    available: true,
    tenureOptions: [3, 6, 12],
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    condition: 'good',
  },
  {
    name: 'Single Bed',
    description: 'Comfortable single bed perfect for small rooms',
    category: 'bed',
    monthlyPrice: 1000,
    securityDeposit: 3500,
    quantity: 7,
    available: true,
    tenureOptions: [3, 6, 12],
    image: 'https://images.unsplash.com/photo-1540932239986-310128078caf?w=800&q=80',
    condition: 'new',
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    await Product.deleteMany({}); // Clear existing products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ ${products.length} products added to database!`);
    console.log('📷 All products now have real images from Unsplash');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
