import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function MyRentals() {
  const { token } = useContext(AuthContext);

  if (!token) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="card max-w-md mx-auto p-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-brand-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Login Required</h2>
          <p className="text-slate-500 mb-6">Please sign in to view your rentals</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">My Active Rentals</h1>
      <p className="text-slate-500 mb-8">Manage your ongoing rental subscriptions</p>

      <div className="card p-12 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center text-4xl">
          📋
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">No Active Rentals</h2>
        <p className="text-slate-500 mb-2">
          Start renting from our catalog to see your subscriptions here.
        </p>
        <p className="text-sm text-slate-400 mb-8">
          Rental management will be fully implemented in Phase 2
        </p>
        <Link to="/" className="btn-primary">
          Browse Products
        </Link>
      </div>
    </div>
  );
}
