const express = require('express');
const Order = require('../models/Order');
const Rental = require('../models/Rental');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create new order (checkout)
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress, deliveryDate, paymentStatus } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Create order
    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount,
      deliveryAddress,
      deliveryDate,
      paymentStatus: paymentStatus || 'pending',
      status: 'pending',
    });

    // Create rentals for each item
    const rentals = await Promise.all(
      items.map((item) => {
        const startDate = new Date(deliveryDate);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + item.rentalMonths);

        return Rental.create({
          userId: req.user.id,
          productId: item.productId,
          tenure: item.rentalMonths,
          monthlyPrice: item.priceAtTime,
          totalCost: item.priceAtTime * item.rentalMonths,
          startDate,
          endDate,
          deliveryDate,
          deliveryAddress,
          status: 'pending',
          paymentStatus: paymentStatus || 'pending',
        });
      })
    );

    res.status(201).json({
      success: true,
      order,
      rentals,
      message: 'Order placed successfully!',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/orders/user
// @desc    Get user's orders
// @access  Private
router.get('/user', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
