import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Spinner } from '../components/LoadingSpinner';
import api from '../services/api';

export default function Checkout() {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    zipcode: '',
    deliveryDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (!token) {
      setError('Please login to place an order');
      setSubmitting(false);
      navigate('/login');
      return;
    }

    try {
      // Create order with cart items
      const orderResponse = await api.post('/orders', {
        items: cart.map((item) => ({
          productId: item.id,
          quantity: 1,
          rentalMonths: item.tenure,
          priceAtTime: item.monthlyPrice,
        })),
        totalAmount: getTotalPrice(),
        deliveryAddress: {
          street: formData.street,
          city: formData.city,
          zipcode: formData.zipcode,
        },
        deliveryDate: formData.deliveryDate,
        paymentStatus: 'completed', // Mock payment
      });

      if (orderResponse.data.success) {
        clearCart();
        navigate('/my-rentals');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <p className="text-slate-500 mb-4">Your cart is empty</p>
        <Link to="/" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Checkout</h1>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
          <span>⚠️</span>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="card p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">1</span>
            Delivery Address
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Street Address</label>
              <input type="text" name="street" value={formData.street} onChange={handleChange} required className="input-field" disabled={submitting} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required className="input-field" disabled={submitting} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Zip Code</label>
                <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} required className="input-field" disabled={submitting} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Delivery Date</label>
              <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} required className="input-field" disabled={submitting} />
            </div>
          </div>

          <button type="submit" disabled={submitting} className="w-full btn-accent py-4 mt-8">
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner size="sm" />
                Placing Order...
              </span>
            ) : (
              '✓ Place Order'
            )}
          </button>
        </form>

        <div className="space-y-6">
          <div className="card p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            <div className="space-y-3">
              {cart.map((item) => (
                <p key={item.id} className="flex justify-between text-sm text-slate-600">
                  <span>{item.name} ({item.tenure}mo)</span>
                  <span className="font-semibold">₹{item.totalCost}</span>
                </p>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-4 mt-4">
              <p className="flex justify-between text-xl font-extrabold text-slate-900">
                <span>Total</span>
                <span className="text-brand-700">₹{getTotalPrice()}</span>
              </p>
            </div>
          </div>

          <div className="card p-6 bg-blue-50 border-blue-100">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">✓ Order Ready:</span> Click "Place Order" to confirm and view your rentals in My Rentals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
