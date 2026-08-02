import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar({ open, setOpen }) {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Products', icon: '📦' },
    { path: '/admin/orders', label: 'Orders', icon: '📋' },
    { path: '/admin/rentals', label: 'Rentals', icon: '🚚' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/analytics', label: 'Analytics', icon: '📈' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative w-64 h-screen transition-transform duration-300 z-50 lg:z-0 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{
          background: 'linear-gradient(180deg, rgba(122,69,17,0.3) 0%, rgba(14,7,3,0.5) 100%)',
          borderRight: '1px solid rgba(196,129,58,0.2)'
        }}>
        <div className="h-full flex flex-col overflow-y-auto">
          
          {/* Sidebar Header */}
          <div className="p-6 border-b" style={{ borderColor: 'rgba(196,129,58,0.1)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7a4511 0%, #c4813a 100%)' }}>
                <span className="text-white font-bold">R</span>
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: '#d4a870' }}>RentEase</p>
                <p className="text-xs" style={{ color: '#7a4511' }}>Admin</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium flex items-center gap-3"
                style={{
                  color: isActive(item.path) ? '#d4a870' : '#c4a882',
                  background: isActive(item.path) ? 'rgba(196,129,58,0.15)' : 'transparent',
                  borderLeft: isActive(item.path) ? '3px solid #c4813a' : '3px solid transparent',
                  paddingLeft: isActive(item.path) ? '16px' : '16px'
                }}
                onMouseEnter={e => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = 'rgba(196,129,58,0.1)';
                    e.currentTarget.style.color = '#d4a870';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#c4a882';
                  }
                }}>
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-6 border-t" style={{ borderColor: 'rgba(196,129,58,0.1)' }}>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(196,129,58,0.1)', border: '1px solid rgba(196,129,58,0.2)' }}>
              <p className="text-xs font-medium mb-2" style={{ color: '#d4a870' }}>Version</p>
              <p className="text-sm font-bold" style={{ color: '#c4813a' }}>2.0.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}