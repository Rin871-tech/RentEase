const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    tenure: {
      type: Number, // in months
      required: true,
    },
    monthlyPrice: Number,
    securityDeposit: Number,
    totalCost: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      street: String,
      city: String,
      zipcode: String,
    },
    deliveryDate: Date,
    pickupDate: Date,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'delivered', 'returned', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Rental', rentalSchema);