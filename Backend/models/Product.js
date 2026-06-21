const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
    },
    description: String,
    category: {
      type: String,
      enum: ['bed', 'sofa', 'table', 'chair', 'fridge', 'washing-machine', 'tv', 'ac'],
      required: true,
    },
    monthlyPrice: {
      type: Number,
      required: [true, 'Please provide monthly rental price'],
    },
    securityDeposit: {
      type: Number,
      required: [true, 'Please provide security deposit'],
    },
    image: String,
    quantity: {
      type: Number,
      default: 1,
    },
    available: {
      type: Boolean,
      default: true,
    },
    tenureOptions: {
      type: [Number], // e.g., [3, 6, 12] for 3, 6, 12 months
      default: [3, 6, 12],
    },
    lastRestocked: Date,
    condition: {
      type: String,
      enum: ['new', 'good', 'fair', 'poor'],
      default: 'good',
    },
    maintenanceHistory: [
      {
        date: Date,
        description: String,
        cost: Number,
        technician: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

productSchema.index({ category: 1 });

module.exports = mongoose.model('Product', productSchema);