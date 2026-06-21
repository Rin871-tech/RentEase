import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Spinner } from '../components/LoadingSpinner';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const [submitting, setSubmitting] = useState(false);
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
    await new Promise((r) => setTimeout(r, 1000));
    clearCart();
    setSubmitting(false);
    navigate('/my-rentals');
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="card p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">1</span>
            Delivery Address
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Street Address</label>
              <input type="text" name="street" value={formData.street} onChange={handleChange} required className="input-field" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Zip Code</label>
                <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} required className="input-field" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Delivery Date</label>
              <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} required className="input-field" />
            </div>
          </div>

          <button type="submit" disabled={submitting} className="w-full btn-accent py-4 mt-8">
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner size="sm" />
                Placing Order...
              </span>
            ) : (
              'Place Order'
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

          <div className="card p-6 bg-brand-50 border-brand-100">
            <p className="text-sm text-brand-800">
              <span className="font-semibold">Note:</span> This is a mock checkout. Payment integration will be added in a future phase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
