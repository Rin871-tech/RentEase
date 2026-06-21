import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ProtectedAdminRoute from '../../components/ProtectedAdminRoute';
import LoadingSpinner from '../../components/LoadingSpinner';
import { adminAnalyticsAPI } from '../../services/api';

function AnalyticsContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await adminAnalyticsAPI.getAnalytics();
      setData(response.data);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Loading analytics..." />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6">
            <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-slate-900">₹{data?.totalRevenue?.toLocaleString()}</p>
          </div>
          <div className="card p-6">
            <p className="text-sm text-slate-600 mb-1">This Month</p>
            <p className="text-3xl font-bold text-green-600">₹{data?.thisMonthRevenue?.toLocaleString()}</p>
          </div>
          <div className="card p-6">
            <p className="text-sm text-slate-600 mb-1">Total Users</p>
            <p className="text-3xl font-bold text-blue-600">{data?.totalUsers}</p>
          </div>
          <div className="card p-6">
            <p className="text-sm text-slate-600 mb-1">New Users (This Month)</p>
            <p className="text-3xl font-bold text-purple-600">{data?.newUsersThisMonth}</p>
          </div>
        </div>

        {/* More Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <p className="text-sm text-slate-600 mb-1">Total Products</p>
            <p className="text-3xl font-bold text-slate-900">{data?.totalProducts}</p>
          </div>
          <div className="card p-6">
            <p className="text-sm text-slate-600 mb-1">Active Rentals</p>
            <p className="text-3xl font-bold text-orange-600">{data?.activeRentals}</p>
          </div>
        </div>

        {/* Top Products */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Top 10 Rented Products</h2>
          {data?.topProducts?.length > 0 ? (
            <div className="space-y-3">
              {data.topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <p className="font-medium text-slate-900">{idx + 1}. {product.name}</p>
                  <div className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.rentals} rentals
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-4">No rental data available</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default function Analytics() {
  return <ProtectedAdminRoute element={<AnalyticsContent />} />;
}
