const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

const adminProtect = async (req, res, next) => {
  const Admin = require('../models/Admin');

  try {
    // First verify token
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if admin exists and has correct role
    const admin = await Admin.findById(decoded.id);
    if (!admin || (admin.role !== 'admin' && admin.role !== 'super-admin')) {
      return res.status(403).json({ message: 'Not authorized - admin access required' });
    }

    req.admin = admin;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

const superAdminProtect = async (req, res, next) => {
  const Admin = require('../models/Admin');

  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if admin exists and has super-admin role
    const admin = await Admin.findById(decoded.id);
    if (!admin || admin.role !== 'super-admin') {
      return res.status(403).json({ message: 'Not authorized - super-admin access required' });
    }

    req.admin = admin;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

module.exports = { protect, adminProtect, superAdminProtect };
