import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, getTotalPrice } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="card max-w-md mx-auto p-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
          <p className="text-slate-500 mb-8">Browse our collection and start renting today</p>
          <Link to="/" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Shopping Cart</h1>
      <p className="text-slate-500 mb-8">{cart.length} item{cart.length > 1 ? 's' : ''} in your cart</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, i) => (
            <div
              key={item.id}
              className="card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 opacity-0-start animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center text-2xl shrink-0">
                  📦
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                  <p className="text-slate-500 text-sm">
                    ₹{item.monthlyPrice}/mo × {item.tenure} months
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <p className="text-2xl font-extrabold text-brand-700">₹{item.totalCost}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-6 h-fit lg:sticky lg:top-24">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
          <div className="space-y-3 mb-6">
            <p className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold">₹{getTotalPrice()}</span>
            </p>
            <p className="flex justify-between text-slate-600">
              <span>Delivery</span>
              <span className="font-semibold text-emerald-600">Free</span>
            </p>
            <p className="flex justify-between text-xl font-extrabold text-slate-900 border-t border-slate-100 pt-4">
              <span>Total</span>
              <span className="text-brand-700">₹{getTotalPrice()}</span>
            </p>
          </div>
          <Link to="/checkout" className="w-full btn-primary text-center block py-3.5">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
