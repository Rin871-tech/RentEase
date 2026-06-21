import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ProtectedAdminRoute from '../../components/ProtectedAdminRoute';
import LoadingSpinner from '../../components/LoadingSpinner';
import { adminAnalyticsAPI } from '../../services/api';

function AdminDashboardContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await adminAnalyticsAPI.getDashboard();
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner size="lg" text="Loading dashboard..." />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Revenue Card */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-slate-900">₹{data?.totalRevenue?.toLocaleString()}</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>

          {/* Active Rentals Card */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Active Rentals</p>
                <p className="text-3xl font-bold text-slate-900">{data?.activeRentals}</p>
              </div>
              <div className="text-4xl">🚚</div>
            </div>
          </div>

          {/* Total Users Card */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-slate-900">{data?.totalUsers}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          {/* Total Orders Card */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-slate-900">{data?.totalOrders}</p>
              </div>
              <div className="text-4xl">📋</div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {data?.recentOrders?.length > 0 ? (
              data.recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">{order.userId?.name}</p>
                    <p className="text-sm text-slate-500">{order._id}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-slate-900">₹{order.totalAmount}</p>
                      <p className="text-sm text-slate-500 capitalize">{order.status}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-4">No recent orders</p>
            )}
          </div>
        </div>

        {/* Top Products Section */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Top Rented Products</h2>
          <div className="space-y-3">
            {data?.topProducts?.length > 0 ? (
              data.topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <p className="font-medium text-slate-900">{product.name}</p>
                  <div className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.rentals} rentals
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-4">No rental data</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function AdminDashboard() {
  return <ProtectedAdminRoute element={<AdminDashboardContent />} />;
}
