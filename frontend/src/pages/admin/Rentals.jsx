import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ProtectedAdminRoute from '../../components/ProtectedAdminRoute';
import LoadingSpinner from '../../components/LoadingSpinner';
import { adminRentalsAPI } from '../../services/api';

function RentalsContent() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchRentals();
  }, [statusFilter]);

  const fetchRentals = async () => {
    try {
      setLoading(true);
      const response = await adminRentalsAPI.getAll({ status: statusFilter || undefined });
      setRentals(response.data.rentals);
    } catch (err) {
      console.error('Failed to fetch rentals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkReturned = async (rentalId) => {
    try {
      await adminRentalsAPI.markReturned(rentalId, { returnDate: new Date() });
      setRentals(rentals.map((r) => (r._id === rentalId ? { ...r, status: 'returned' } : r)));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to mark as returned');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-blue-100 text-blue-700',
      delivered: 'bg-purple-100 text-purple-700',
      returned: 'bg-green-100 text-green-700',
      overdue: 'bg-red-100 text-red-700',
      completed: 'bg-slate-100 text-slate-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Loading rentals..." />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Rentals</h1>

        {/* Status Filter */}
        <div className="card p-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field max-w-xs"
          >
            <option value="">All Rentals</option>
            <option value="active">Active</option>
            <option value="returned">Returned</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Rentals List */}
        {rentals.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-slate-500 text-lg">No rentals found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {rentals.map((rental) => (
              <div key={rental._id} className="card p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{rental.productId?.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">User: {rental.userId?.name}</p>
                    <p className="text-sm text-slate-600 mt-1">₹{rental.totalCost} for {rental.tenure} months</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(rental.status)}`}>
                      {rental.status}
                    </span>
                    {rental.status !== 'returned' && (
                      <button
                        onClick={() => handleMarkReturned(rental._id)}
                        className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm hover:bg-green-200 transition-colors"
                      >
                        ✓ Mark Returned
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default function Rentals() {
  return <ProtectedAdminRoute element={<RentalsContent />} />;
}
