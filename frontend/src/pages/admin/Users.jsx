import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ProtectedAdminRoute from '../../components/ProtectedAdminRoute';
import LoadingSpinner from '../../components/LoadingSpinner';
import { adminUsersAPI } from '../../services/api';

function UsersContent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminUsersAPI.getAll();
      setUsers(response.data.users);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Loading users..." />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Users</h1>

        {users.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-slate-500 text-lg">No users found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user._id} className="card p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{user.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{user.email}</p>
                    <p className="text-sm text-slate-600 mt-1">{user.city || 'City not provided'}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-brand-600">{user.totalRentals}</p>
                      <p className="text-xs text-slate-500 mt-1">Rentals</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">₹{user.totalSpent.toLocaleString()}</p>
                      <p className="text-xs text-slate-500 mt-1">Spent</p>
                    </div>
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

export default function Users() {
  return <ProtectedAdminRoute element={<UsersContent />} />;
}
