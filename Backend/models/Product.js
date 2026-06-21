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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);