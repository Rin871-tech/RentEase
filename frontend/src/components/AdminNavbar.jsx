import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AdminNavbar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const { adminUser, logoutAdmin } = useContext(AuthContext);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <nav className="border-b transition-all duration-300"
      style={{
        background: 'linear-gradient(90deg, rgba(122,69,17,0.4) 0%, rgba(196,129,58,0.2) 100%)',
        borderBottom: '1px solid rgba(196,129,58,0.2)'
      }}>
      <div className="px-6 py-4 flex items-center justify-between">
        
        {/* Left: Toggle + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg transition-all duration-200 hidden lg:flex"
            style={{ color: '#d4a870' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(196,129,58,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md"
              style={{ background: 'linear-gradient(135deg, #7a4511 0%, #c4813a 100%)', border: '1px solid rgba(196,129,58,0.4)' }}>
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <h1 className="font-bold hidden sm:block" style={{ color: '#d4a870' }}>
              RentEase Admin
            </h1>
          </div>
        </div>

        {/* Right: User Info + Logout */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium" style={{ color: '#d4a870' }}>
              {adminUser?.name || 'Admin'}
            </p>
            <p className="text-xs capitalize" style={{ color: '#7a4511' }}>
              {adminUser?.role || 'Admin'}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            style={{ color: '#c49a82', background: 'rgba(196,80,26,0.1)' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#e07060'; e.currentTarget.style.background = 'rgba(196,80,26,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#c49a82'; e.currentTarget.style.background = 'rgba(196,80,26,0.1)'; }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}