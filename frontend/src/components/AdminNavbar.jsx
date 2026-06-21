import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { adminUser, logoutAdmin } = useContext(AuthContext);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-600 to-brand-700 flex items-center justify-center text-white font-bold text-lg">
            R
          </div>
          <h1 className="text-xl font-bold text-slate-900">RentEase Admin</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">{adminUser?.name}</p>
            <p className="text-xs text-slate-500 capitalize">{adminUser?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
