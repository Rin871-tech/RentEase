// File: backend/middleware/adminAuth.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Verify Admin Token
const verifyAdminToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Check Admin Exists & Active
const checkAdminActive = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.adminId);

    if (!admin || !admin.isActive) {
      return res.status(403).json({ message: 'Admin account is inactive' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Check Specific Permission
const checkPermission = (permissionKey) => {
  return (req, res, next) => {
    if (!req.admin.permissions[permissionKey] && req.admin.role !== 'super_admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }
    next();
  };
};

// Check Super Admin Only
const checkSuperAdmin = (req, res, next) => {
  if (req.admin.role !== 'super_admin') {
    return res.status(403).json({ message: 'Super Admin access required' });
  }
  next();
};

module.exports = {
  verifyAdminToken,
  checkAdminActive,
  checkPermission,
  checkSuperAdmin,
};