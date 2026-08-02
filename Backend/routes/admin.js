// File: backend/routes/admin.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Product = require('../models/Product');
const User = require('../models/User');
const Rental = require('../models/Rental');
const {
  verifyAdminToken,
  checkAdminActive,
  checkPermission,
  checkSuperAdmin,
} = require('../middleware/adminAuth');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// ============ SETUP ENDPOINT (One-time use) ============

// Create First Super Admin
router.post('/setup/create-admin', async (req, res) => {
  try {
    const existingAdmins = await Admin.countDocuments();

    if (existingAdmins > 0) {
      return res.status(400).json({
        message: 'Admin already exists. Setup is complete.',
      });
    }

    const admin = new Admin({
      name: 'Admin',
      email: 'admin@rentease.com',
      password: 'Admin@123',
      role: 'super_admin',
      permissions: {
        manageProducts: true,
        manageOrders: true,
        manageUsers: true,
        manageAdmins: true,
        viewAnalytics: true,
      },
    });

    await admin.save();

    const token = generateToken(admin._id);

    res.status(201).json({
      message: 'First admin created successfully',
      token,
      credentials: {
        email: 'admin@rentease.com',
        password: 'Admin@123',
        note: 'Please change password after first login',
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ ADMIN AUTH ============

// Admin Login
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!admin.isActive) {
      return res.status(403).json({ message: 'Admin account is inactive' });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(admin._id);

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Current Admin
router.get('/me', verifyAdminToken, checkAdminActive, (req, res) => {
  res.json({
    id: req.admin._id,
    name: req.admin.name,
    email: req.admin.email,
    role: req.admin.role,
    permissions: req.admin.permissions,
  });
});

// ============ PRODUCT MANAGEMENT ============

// Get All Products
router.get(
  '/products',
  verifyAdminToken,
  checkAdminActive,
  checkPermission('manageProducts'),
  async (req, res) => {
    try {
      const products = await Product.find();
      res.json({
        count: products.length,
        products,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Get Single Product
router.get(
  '/products/:id',
  verifyAdminToken,
  checkAdminActive,
  checkPermission('manageProducts'),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Create Product
router.post(
  '/products',
  verifyAdminToken,
  checkAdminActive,
  checkPermission('manageProducts'),
  async (req, res) => {
    try {
      const { name, description, category, monthlyPrice, securityDeposit, image, quantity } = req.body;

      const product = new Product({
        name,
        description,
        category,
        monthlyPrice,
        securityDeposit,
        image,
        quantity,
        available: quantity > 0,
      });

      await product.save();
      res.status(201).json({
        message: 'Product created',
        product,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Update Product
router.put(
  '/products/:id',
  verifyAdminToken,
  checkAdminActive,
  checkPermission('manageProducts'),
  async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json({
        message: 'Product updated',
        product,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Delete Product
router.delete(
  '/products/:id',
  verifyAdminToken,
  checkAdminActive,
  checkPermission('manageProducts'),
  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json({
        message: 'Product deleted',
        product,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// ============ ORDER MANAGEMENT ============

// Get All Orders
router.get(
  '/orders',
  verifyAdminToken,
  checkAdminActive,
  checkPermission('manageOrders'),
  async (req, res) => {
    try {
      const orders = await Rental.find()
        .populate('userId', 'name email phone')
        .populate('productId', 'name monthlyPrice');

      res.json({
        count: orders.length,
        orders,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Update Order Status
router.put(
  '/orders/:id/status',
  verifyAdminToken,
  checkAdminActive,
  checkPermission('manageOrders'),
  async (req, res) => {
    try {
      const { status, paymentStatus } = req.body;

      const rental = await Rental.findByIdAndUpdate(
        req.params.id,
        {
          status,
          paymentStatus: paymentStatus || rental.paymentStatus,
        },
        { new: true }
      );

      if (!rental) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.json({
        message: 'Order updated',
        order: rental,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// ============ RENTALS MANAGEMENT ============

// Get All Rentals
router.get(
  '/rentals',
  verifyAdminToken,
  checkAdminActive,
  checkPermission('manageOrders'),
  async (req, res) => {
    try {
      const rentals = await Rental.find()
        .populate('userId', 'name email phone')
        .populate('productId', 'name monthlyPrice category');

      res.json({
        count: rentals.length,
        rentals,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Get Single Rental
router.get(
  '/rentals/:id',
  verifyAdminToken,
  checkAdminActive,
  checkPermission('manageOrders'),
  async (req, res) => {
    try {
      const rental = await Rental.findById(req.params.id)
        .populate('userId', 'name email phone')
        .populate('productId', 'name monthlyPrice category');

      if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
      }

      res.json(rental);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Mark Rental as Returned
router.put(
  '/rentals/:id/return',
  verifyAdminToken,
  checkAdminActive,
  checkPermission('manageOrders'),
  async (req, res) => {
    try {
      const { returnDate, condition } = req.body;

      const rental = await Rental.findByIdAndUpdate(
        req.params.id,
        {
          status: 'returned',
          returnDate: returnDate || new Date(),
          condition,
        },
        { new: true }
      );

      if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
      }

      res.json({
        message: 'Rental marked as returned',
        rental,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Report Damage
router.post(
  '/rentals/:id/damage',
  verifyAdminToken,
  checkAdminActive,
  checkPermission('manageOrders'),
  async (req, res) => {
    try {
      const { description, amount } = req.body;

      const rental = await Rental.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            'damageReport.description': description,
            'damageReport.amount': amount,
            'damageReport.reportedDate': new Date(),
          },
        },
        { new: true }
      );

      if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
      }

      res.json({
        message: 'Damage reported',
        rental,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// ============ USER MANAGEMENT ============

// Get All Users
router.get(
  '/users',
  verifyAdminToken,
  checkAdminActive,
  checkPermission('manageUsers'),
  async (req, res) => {
    try {
      const users = await User.find().select('-password');

      res.json({
        count: users.length,
        users,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Get User Details
router.get(
  '/users/:id',
  verifyAdminToken,
  checkAdminActive,
  checkPermission('manageUsers'),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const rentals = await Rental.find({ userId: req.params.id });

      res.json({
        user,
        rentals: rentals.length,
        totalSpent: rentals.reduce((sum, r) => sum + r.totalCost, 0),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// ============ ADMIN MANAGEMENT ============

// Get All Admins (Super Admin Only)
router.get(
  '/admins',
  verifyAdminToken,
  checkAdminActive,
  checkSuperAdmin,
  async (req, res) => {
    try {
      const admins = await Admin.find().select('-password');

      res.json({
        count: admins.length,
        admins,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Create Admin (Super Admin Only)
router.post(
  '/admins',
  verifyAdminToken,
  checkAdminActive,
  checkSuperAdmin,
  async (req, res) => {
    try {
      const { name, email, password, role, permissions } = req.body;

      const existingAdmin = await Admin.findOne({ email });

      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin with this email already exists' });
      }

      const admin = new Admin({
        name,
        email,
        password,
        role,
        permissions,
      });

      await admin.save();

      res.status(201).json({
        message: 'Admin created',
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
  }
);

// ============ ANALYTICS ============

// Dashboard Analytics (Main endpoint for dashboard)
router.get(
  '/dashboard',
  verifyAdminToken,
  checkAdminActive,
  checkPermission('viewAnalytics'),
  async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalProducts = await Product.countDocuments();
      const totalOrders = await Rental.countDocuments();
      const activeRentals = await Rental.countDocuments({ status: 'active' });

      // Revenue calculation
      const rentals = await Rental.find({ paymentStatus: 'completed' });
      const totalRevenue = rentals.reduce((sum, r) => sum + (r.totalCost || 0), 0);

      // Get recent orders (last 5)
      const recentOrders = await Rental.find()
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
        .limit(5);

      // Get top products
      const topProductsAgg = await Rental.aggregate([
        {
          $group: {
            _id: '$productId',
            rentals: { $sum: 1 },
          },
        },
        { $sort: { rentals: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'product',
          },
        },
      ]);

      const topProducts = topProductsAgg.map((item) => ({
        _id: item._id,
        name: item.product[0]?.name || 'Unknown',
        rentals: item.rentals,
      }));

      res.json({
        totalRevenue,
        activeRentals,
        totalUsers,
        totalOrders,
        totalProducts,
        recentOrders,
        topProducts,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Full Analytics
router.get(
  '/analytics',
  verifyAdminToken,
  checkAdminActive,
  checkPermission('viewAnalytics'),
  async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalProducts = await Product.countDocuments();
      const totalRentals = await Rental.countDocuments();
      const activeRentals = await Rental.countDocuments({ status: 'active' });

      const rentals = await Rental.find({ paymentStatus: 'completed' });
      const totalRevenue = rentals.reduce((sum, r) => sum + (r.totalCost || 0), 0);

      const rentalsByStatus = await Rental.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]);

      res.json({
        summary: {
          totalUsers,
          totalProducts,
          totalRentals,
          activeRentals,
          totalRevenue,
        },
        rentalsByStatus: Object.fromEntries(
          rentalsByStatus.map((item) => [item._id, item.count])
        ),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;