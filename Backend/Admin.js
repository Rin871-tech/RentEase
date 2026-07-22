const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['super_admin', 'admin', 'manager'],
      default: 'admin',
    },
    permissions: {
      manageProducts: {
        type: Boolean,
        default: false,
      },
      manageOrders: {
        type: Boolean,
        default: false,
      },
      manageUsers: {
        type: Boolean,
        default: false,
      },
      manageAdmins: {
        type: Boolean,
        default: false,
      },
      viewAnalytics: {
        type: Boolean,
        default: false,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Hash password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // Auto-set permissions based on role
    if (this.role === 'super_admin') {
      this.permissions = {
        manageProducts: true,
        manageOrders: true,
        manageUsers: true,
        manageAdmins: true,
        viewAnalytics: true,
      };
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);