import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const closeMobile = () => setMobileMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/50' : ''}`}
      style={{ background: 'linear-gradient(180deg, rgba(14,7,3,0.98) 0%, rgba(20,9,0,0.96) 100%)', borderBottom: '1px solid rgba(196,129,58,0.2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-[4.5rem]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.02]" onClick={closeMobile}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-shadow duration-300 group-hover:shadow-glow"
              style={{ background: 'linear-gradient(135deg, #7a4511 0%, #c4813a 100%)', border: '1px solid rgba(196,129,58,0.4)' }}>
              {/* Wooden chair icon */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="2" width="14" height="9" rx="2" fill="#fdf6ec" opacity="0.9"/>
                <rect x="3" y="11" width="18" height="4" rx="1.5" fill="#fdf6ec"/>
                <rect x="5" y="15" width="3" height="7" rx="1" fill="#fdf6ec" opacity="0.8"/>
                <rect x="16" y="15" width="3" height="7" rx="1" fill="#fdf6ec" opacity="0.8"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-display leading-tight" style={{ color: '#d4a870' }}>
                RentEase
              </span>
              <span className="text-[10px] font-medium tracking-widest uppercase hidden sm:block font-body" style={{ color: '#7a4511' }}>
                Rent Smart
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}>Home</Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}>About</Link>
            {user && (
              <Link to="/my-rentals" className={`nav-link ${isActive('/my-rentals') ? 'nav-link-active' : ''}`}>
                My Rentals
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(122,69,17,0.3)', border: '1px solid rgba(196,129,58,0.3)' }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-wood-950 text-xs font-bold font-body"
                    style={{ background: 'linear-gradient(135deg, #c4813a, #d4a870)' }}>
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold max-w-[120px] truncate font-body" style={{ color: '#d4a870' }}>
                    {user.name}
                  </span>
                </div>
                <button onClick={logout}
                  className="text-sm font-medium font-body px-3 py-2 rounded-lg transition-all duration-200"
                  style={{ color: '#c49a82' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#e07060'; e.currentTarget.style.background = 'rgba(196,80,26,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#c49a82'; e.currentTarget.style.background = 'transparent'; }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-2.5 px-5">Sign Up Free</Link>
              </>
            )}

            <Link to="/cart" className="relative ml-1 p-2.5 rounded-xl transition-all duration-200 group"
              style={{ color: '#c4a882' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#d4a870'; e.currentTarget.style.background = 'rgba(122,69,17,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#c4a882'; e.currentTarget.style.background = 'transparent'; }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 text-wood-950 text-xs rounded-full flex items-center justify-center font-bold shadow-sm animate-scale-in font-body"
                  style={{ background: 'linear-gradient(135deg, #c4813a, #d4a870)' }}>
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/cart" className="relative p-2 rounded-lg" style={{ color: '#c4a882' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-wood-950 text-[10px] rounded-full flex items-center justify-center font-bold font-body"
                  style={{ background: '#c4813a' }}>
                  {cart.length}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg transition-colors" style={{ color: '#c4a882' }}>
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
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 pt-2 space-y-1" style={{ borderTop: '1px solid rgba(196,129,58,0.15)', background: 'rgba(14,7,3,0.98)' }}>
          <Link to="/" onClick={closeMobile} className={`block nav-link ${isActive('/') ? 'nav-link-active' : ''}`}>Home</Link>
          <Link to="/about" onClick={closeMobile} className={`block nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}>About</Link>
          {user ? (
            <>
              <Link to="/my-rentals" onClick={closeMobile} className="block nav-link">My Rentals</Link>
              <button onClick={() => { logout(); closeMobile(); }}
                className="block w-full text-left nav-link" style={{ color: '#e07060' }}>
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" onClick={closeMobile} className="btn-secondary text-center">Login</Link>
              <Link to="/register" onClick={closeMobile} className="btn-primary text-center">Sign Up Free</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
