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
            <p className="font-medium" style={{ color: '#e07060' }}>{error}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#d4a870' }}>Dashboard</h1>
          <p style={{ color: '#c4a882' }}>Welcome to RentEase Admin Panel</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Revenue Card */}
          <div
            className="p-6 rounded-xl transition-all duration-200 border hover:scale-105 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(196,129,58,0.1) 0%, rgba(122,69,17,0.1) 100%)',
              border: '1px solid rgba(196,129,58,0.2)'
            }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-2" style={{ color: '#7a4511' }}>Total Revenue</p>
                <p className="text-3xl font-bold" style={{ color: '#d4a870' }}>
                  ₹{data?.totalRevenue?.toLocaleString() || '0'}
                </p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>

          {/* Active Rentals Card */}
          <div
            className="p-6 rounded-xl transition-all duration-200 border hover:scale-105 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(196,129,58,0.1) 0%, rgba(122,69,17,0.1) 100%)',
              border: '1px solid rgba(196,129,58,0.2)'
            }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-2" style={{ color: '#7a4511' }}>Active Rentals</p>
                <p className="text-3xl font-bold" style={{ color: '#d4a870' }}>
                  {data?.activeRentals || '0'}
                </p>
              </div>
              <div className="text-4xl">🚚</div>
            </div>
          </div>

          {/* Total Users Card */}
          <div
            className="p-6 rounded-xl transition-all duration-200 border hover:scale-105 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(196,129,58,0.1) 0%, rgba(122,69,17,0.1) 100%)',
              border: '1px solid rgba(196,129,58,0.2)'
            }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-2" style={{ color: '#7a4511' }}>Total Users</p>
                <p className="text-3xl font-bold" style={{ color: '#d4a870' }}>
                  {data?.totalUsers || '0'}
                </p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          {/* Total Orders Card */}
          <div
            className="p-6 rounded-xl transition-all duration-200 border hover:scale-105 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(196,129,58,0.1) 0%, rgba(122,69,17,0.1) 100%)',
              border: '1px solid rgba(196,129,58,0.2)'
            }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-2" style={{ color: '#7a4511' }}>Total Orders</p>
                <p className="text-3xl font-bold" style={{ color: '#d4a870' }}>
                  {data?.totalOrders || '0'}
                </p>
              </div>
              <div className="text-4xl">📋</div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div
          className="p-6 rounded-xl border"
          style={{
            background: 'linear-gradient(135deg, rgba(196,129,58,0.05) 0%, rgba(122,69,17,0.05) 100%)',
            border: '1px solid rgba(196,129,58,0.15)'
          }}>
          <h2 className="text-xl font-bold mb-6" style={{ color: '#d4a870' }}>Recent Orders</h2>
          <div className="space-y-3">
            {data?.recentOrders?.length > 0 ? (
              data.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:scale-102"
                  style={{
                    background: 'rgba(14,7,3,0.3)',
                    border: '1px solid rgba(196,129,58,0.15)'
                  }}>
                  <div>
                    <p className="font-medium" style={{ color: '#d4a870' }}>{order.userId?.name || 'Unknown'}</p>
                    <p className="text-sm" style={{ color: '#7a4511' }}>{order._id?.slice(-8)}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-bold" style={{ color: '#d4a870' }}>₹{order.totalAmount}</p>
                      <p className="text-sm capitalize" style={{ color: '#c4a882' }}>{order.status}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full" style={{
                      background: order.status === 'completed' ? '#4ade80' :
                                 order.status === 'pending' ? '#f97316' : '#c4813a'
                    }}></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-8" style={{ color: '#c4a882' }}>No recent orders</p>
            )}
          </div>
        </div>

        {/* Top Products Section */}
        <div
          className="p-6 rounded-xl border"
          style={{
            background: 'linear-gradient(135deg, rgba(196,129,58,0.05) 0%, rgba(122,69,17,0.05) 100%)',
            border: '1px solid rgba(196,129,58,0.15)'
          }}>
          <h2 className="text-xl font-bold mb-6" style={{ color: '#d4a870' }}>Top Rented Products</h2>
          <div className="space-y-3">
            {data?.topProducts?.length > 0 ? (
              data.topProducts.map((product, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:scale-102"
                  style={{
                    background: 'rgba(14,7,3,0.3)',
                    border: '1px solid rgba(196,129,58,0.15)'
                  }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(196,129,58,0.2)' }}>
                      <span style={{ color: '#d4a870' }} className="text-lg font-bold">{idx + 1}</span>
                    </div>
                    <p className="font-medium" style={{ color: '#d4a870' }}>{product.name}</p>
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: 'rgba(196,129,58,0.2)', color: '#d4a870' }}>
                    {product.rentals} rentals
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-8" style={{ color: '#c4a882' }}>No rental data</p>
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