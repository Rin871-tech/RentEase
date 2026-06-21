import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-navbar-gradient backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-[4.5rem]">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group transition-transform duration-300 hover:scale-[1.02]"
            onClick={closeMobile}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md shadow-brand-500/30 group-hover:shadow-lg group-hover:shadow-brand-500/40 transition-shadow duration-300">
              <span className="text-white text-lg font-bold">R</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent leading-tight">
                RentEase
              </span>
              <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase hidden sm:block">
                Rent Smart
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}>
              Home
            </Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}>
              About
            </Link>
            {user && (
              <Link
                to="/my-rentals"
                className={`nav-link ${isActive('/my-rentals') ? 'nav-link-active' : ''}`}
              >
                My Rentals
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-brand-800 max-w-[120px] truncate">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-slate-500 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2.5 px-5">
                  Sign Up Free
                </Link>
              </>
            )}

            <Link
              to="/cart"
              className="relative ml-1 p-2.5 rounded-xl text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-all duration-200 group"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-sm animate-scale-in">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/cart" className="relative p-2 rounded-lg text-slate-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-1 border-t border-slate-100 bg-white/95 backdrop-blur-lg">
          <Link to="/" onClick={closeMobile} className={`block nav-link ${isActive('/') ? 'nav-link-active' : ''}`}>
            Home
          </Link>
          <Link to="/about" onClick={closeMobile} className={`block nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}>
            About
          </Link>
          {user ? (
            <>
              <Link to="/my-rentals" onClick={closeMobile} className="block nav-link">
                My Rentals
              </Link>
              <button
                onClick={() => { logout(); closeMobile(); }}
                className="block w-full text-left nav-link text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" onClick={closeMobile} className="btn-secondary text-center">
                Login
              </Link>
              <Link to="/register" onClick={closeMobile} className="btn-primary text-center">
                Sign Up Free
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
