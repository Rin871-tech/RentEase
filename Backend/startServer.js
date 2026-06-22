const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

async function start() {
  let mongod;
  try {
    mongod = await MongoMemoryServer.create({
      instance: { dbName: 'rentease' }
    });
    const uri = mongod.getUri();
    process.env.MONGODB_URI = uri;
    console.log(`✅ MongoDB Memory Server running at: ${uri}`);
  } catch (err) {
    console.error('Could not start MongoMemoryServer, falling back to env URI:', err.message);
  }

  require('./server.js');

  const Product = require('./models/Product');
  const seedProducts = async () => {
    const count = await Product.countDocuments();
    if (count > 0) return;

    await Product.insertMany([
      {
        name: 'Queen Bed',
        description: 'Comfortable queen size bed with storage',
        category: 'bed',
        monthlyPrice: 1500,
        securityDeposit: 5000,
        quantity: 5,
        available: true,
        tenureOptions: [3, 6, 12],
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=800&q=80',
      },
    ]);
    console.log('✅ Sample products seeded to database');
  };

  mongoose.connection.once('open', () => {
    seedProducts().catch(console.error);
  });
}

start().catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});
