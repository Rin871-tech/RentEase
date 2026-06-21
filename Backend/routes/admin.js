const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Rental = require('../models/Rental');
const { adminProtect, superAdminProtect } = require('../middleware/adminAuth');

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @route   POST /api/admin/auth/login
// @desc    Login admin
// @access  Public
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for admin
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/admin/auth/register
// @desc    Register new admin (super-admin only)
// @access  Private/Super-Admin
router.post('/auth/register', superAdminProtect, async (req, res) => {
  try {
    const { name, email, password, role, permissions } = req.body;

    // Check if admin exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Validate role
    if (!['admin', 'manager', 'super-admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password,
      role,
      permissions: permissions || [],
    });

    // Generate token
    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/auth/me
// @desc    Get current logged in admin
// @access  Private
router.get('/auth/me', adminProtect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    res.status(200).json({ success: true, admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/dashboard
// @desc    Get dashboard metrics
// @access  Private/Admin
router.get('/dashboard', adminProtect, async (req, res) => {
  try {
    // Get all metrics
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);

    const activeRentals = await Rental.countDocuments({ status: 'active' });
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Get recent orders with user details
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'name email')
      .lean();

    // Get top products by rental count
    const topProducts = await Rental.aggregate([
      { $group: { _id: '$productId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
    ]);

    res.status(200).json({
      success: true,
      totalRevenue: totalRevenue[0]?.total || 0,
      activeRentals,
      totalUsers,
      totalProducts,
      totalOrders,
      recentOrders,
      topProducts: topProducts.map((item) => ({
        name: item.product.name,
        rentals: item.count,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ PRODUCT MANAGEMENT ============

// @route   GET /api/admin/products
// @desc    Get all products (admin view)
// @access  Private/Admin
router.get('/products', adminProtect, async (req, res) => {
  try {
    const { category, skip = 0, limit = 10 } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/admin/products
// @desc    Create new product
// @access  Private/Admin
router.post('/products', adminProtect, async (req, res) => {
  try {
    const { name, description, category, monthlyPrice, securityDeposit, quantity, tenureOptions, image } = req.body;

    // Validate required fields
    if (!name || !category || !monthlyPrice || !securityDeposit) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const product = await Product.create({
      name,
      description,
      category,
      monthlyPrice,
      securityDeposit,
      quantity: quantity || 1,
      tenureOptions: tenureOptions || [3, 6, 12],
      image,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/products/:id
// @desc    Update product
// @access  Private/Admin
router.put('/products/:id', adminProtect, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/admin/products/:id
// @desc    Delete product
// @access  Private/Admin
router.delete('/products/:id', adminProtect, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product has active rentals
    const activeRentals = await Rental.findOne({
      productId: id,
      status: { $in: ['pending', 'confirmed', 'delivered'] },
    });

    if (activeRentals) {
      return res.status(400).json({ message: 'Cannot delete product with active rentals' });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ ORDER MANAGEMENT ============

// @route   GET /api/admin/orders
// @desc    Get all orders with filters
// @access  Private/Admin
router.get('/orders', adminProtect, async (req, res) => {
  try {
    const { status, skip = 0, limit = 10 } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .populate('userId', 'name email phone')
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/orders/:id
// @desc    Get order details
// @access  Private/Admin
router.get('/orders/:id', adminProtect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId')
      .populate('items.productId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/orders/:id/status
// @desc    Update order status
// @access  Private/Admin
router.put('/orders/:id/status', adminProtect, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'confirmed', 'delivered', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // If status is delivered, update associated rentals
    if (status === 'delivered') {
      await Rental.updateMany({ orderId: order._id }, { status: 'delivered' });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ RENTAL MANAGEMENT ============

// @route   GET /api/admin/rentals
// @desc    Get all rentals with filters
// @access  Private/Admin
router.get('/rentals', adminProtect, async (req, res) => {
  try {
    const { status, skip = 0, limit = 10 } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    const total = await Rental.countDocuments(filter);
    const rentals = await Rental.find(filter)
      .populate('userId', 'name email')
      .populate('productId', 'name')
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total,
      count: rentals.length,
      rentals,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/admin/rentals/:id
// @desc    Get rental details
// @access  Private/Admin
router.get('/rentals/:id', adminProtect, async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id)
      .populate('userId')
      .populate('productId');

    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    res.status(200).json({
      success: true,
      rental,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/admin/rentals/:id/return
// @desc    Mark rental as returned
// @access  Private/Admin
router.put('/rentals/:id/return', adminProtect, async (req, res) => {
  try {
    const { returnDate } = req.body;

    const rental = await Rental.findByIdAndUpdate(
      req.params.id,
      {
        status: 'returned',
        returnDate: returnDate || new Date(),
      },
      { new: true }
    );

    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    res.status(200).json({
      success: true,
      rental,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/admin/rentals/:id/damage
// @desc    Report damage on rental
// @access  Private/Admin
router.post('/rentals/:id/damage', adminProtect, async (req, res) => {
  try {
    const { description, amount } = req.body;

    const rental = await Rental.findByIdAndUpdate(
      req.params.id,
      {
        damageReport: {
          description,
          amount,
          reportedDate: new Date(),
        },
      },
      { new: true }
    );

    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    res.status(200).json({
      success: true,
      rental,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ USER MANAGEMENT ============

// @route   GET /api/admin/users
// @desc    Get all users with stats
// @access  Private/Admin
router.get('/users', adminProtect, async (req, res) => {
  try {
    const { skip = 0, limit = 10 } = req.query;

    const total = await User.countDocuments();
    const users = await User.find()
      .select('-password')
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .lean();

    // Get stats for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const rentals = await Rental.countDocuments({ userId: user._id });
        const totalSpent = await Order.aggregate([
          { $match: { userId: user._id } },
          { $group: { _id: null, total: { $sum: '$totalAmount' } } },
        ]);

        return {
          ...user,
          totalRentals: rentals,
          totalSpent: totalSpent[0]?.total || 0,
        };
      })
    );

    res.status(200).json({
      success: true,
      total,
      count: usersWithStats.length,
      users: usersWithStats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ ANALYTICS ============

// @route   GET /api/admin/analytics
// @desc    Get analytics data
// @access  Private/Admin
router.get('/analytics', adminProtect, async (req, res) => {
  try {
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);

    const thisMonthRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);

    const totalUsers = await User.countDocuments();
    const newUsersThisMonth = await User.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    });

    const totalProducts = await Product.countDocuments();
    const activeRentals = await Rental.countDocuments({ status: 'active' });

    const topProducts = await Rental.aggregate([
      { $group: { _id: '$productId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
    ]);

    res.status(200).json({
      success: true,
      totalRevenue: totalRevenue[0]?.total || 0,
      thisMonthRevenue: thisMonthRevenue[0]?.total || 0,
      totalUsers,
      newUsersThisMonth,
      totalProducts,
      activeRentals,
      topProducts: topProducts.map((item) => ({
        name: item.product.name,
        rentals: item.count,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

