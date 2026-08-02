import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import adminApi from '../../services/adminApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import AdminLayout from '../../components/AdminLayout';

export default function AdminOrders() {
  const navigate = useNavigate();
  const { adminToken, logoutAdmin } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }
    fetchOrders();
  }, [adminToken]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getOrders(adminToken);
      setOrders(response.data.orders);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load orders');
      if (err.response?.status === 401) {
        logoutAdmin();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await adminApi.updateOrderStatus(orderId, newStatus, adminToken);
      const updatedOrders = orders.map(o =>
        o._id === orderId ? { ...o, status: newStatus } : o
      );
      setOrders(updatedOrders);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update order status');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Orders</h1>

        {/* Error Message */}
        {error && (
          <div className="card bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Orders Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">User</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900 font-mono">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.userId?.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">₹{order.totalAmount}</td>
                    <td className="px-6 py-4 text-sm">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="input-field text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {orders.length === 0 && (
          <div className="card text-center p-12">
            <p className="text-slate-600">No orders yet</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}