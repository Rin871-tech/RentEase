import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: '📊', label: 'Dashboard', path: '/admin/dashboard' },
  { icon: '📦', label: 'Products', path: '/admin/products' },
  { icon: '📋', label: 'Orders', path: '/admin/orders' },
  { icon: '🚚', label: 'Rentals', path: '/admin/rentals' },
  { icon: '👥', label: 'Users', path: '/admin/users' },
  { icon: '📈', label: 'Analytics', path: '/admin/analytics' },
  { icon: '⚙️', label: 'Settings', path: '/admin/settings' },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-slate-200 shadow-sm transition-all duration-300 flex flex-col h-screen sticky top-0`}
      >
        {/* Collapse Button */}
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
          >
            {isOpen ? '◀️' : '▶️'}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-brand-100 text-brand-700 font-medium'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
