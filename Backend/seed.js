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
    image: 'https://images.pexels.com/photos/36777941/pexels-photo-36777941.jpeg',
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
    image: 'https://images.pexels.com/photos/6588592/pexels-photo-6588592.jpeg',
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
    image: 'https://images.pexels.com/photos/4221404/pexels-photo-4221404.jpeg',
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
    image: 'https://images.pexels.com/photos/14245340/pexels-photo-14245340.jpeg',
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
    image: 'https://images.pexels.com/photos/3958962/pexels-photo-3958962.jpeg',
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
    image: 'https://images.pexels.com/photos/28479466/pexels-photo-28479466.jpeg',
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
    image: 'https://images.pexels.com/photos/5202925/pexels-photo-5202925.jpeg',
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
    image: 'https://images.pexels.com/photos/20896377/pexels-photo-20896377.jpeg',
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
    image: 'https://images.pexels.com/photos/7749060/pexels-photo-7749060.jpeg',
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
    image: 'https://images.pexels.com/photos/35236646/pexels-photo-35236646.jpeg',
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
