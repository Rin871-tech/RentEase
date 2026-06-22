import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(180deg, #0e0703 0%, #140900 100%)', borderTop: '1px solid rgba(196,129,58,0.2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7a4511 0%, #c4813a 100%)', border: '1px solid rgba(196,129,58,0.4)' }}>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="2" width="14" height="9" rx="2" fill="#fdf6ec" opacity="0.9"/>
                  <rect x="3" y="11" width="18" height="4" rx="1.5" fill="#fdf6ec"/>
                  <rect x="5" y="15" width="3" height="7" rx="1" fill="#fdf6ec" opacity="0.8"/>
                  <rect x="16" y="15" width="3" height="7" rx="1" fill="#fdf6ec" opacity="0.8"/>
                </svg>
              </div>
              <span className="font-bold text-xl font-display" style={{ color: '#d4a870' }}>RentEase</span>
            </div>
            <p className="text-sm leading-relaxed font-body" style={{ color: '#8b6040' }}>
              Making furniture rental affordable, flexible, and sustainable — crafted with care for every home.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { label: 'F', name: 'Facebook' },
                { label: 'T', name: 'Twitter' },
                { label: 'I', name: 'Instagram' },
              ].map((social) => (
                <a key={social.name} href="#" aria-label={social.name}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold font-body transition-all duration-300"
                  style={{ background: 'rgba(122,69,17,0.4)', color: '#c4a882', border: '1px solid rgba(196,129,58,0.2)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#7a4511'; e.currentTarget.style.color = '#fdf6ec'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(122,69,17,0.4)'; e.currentTarget.style.color = '#c4a882'; }}>
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-display" style={{ color: '#d4a870' }}>Quick Links</h4>
            <ul className="space-y-2.5 text-sm font-body" style={{ color: '#8b6040' }}>
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about' },
                { label: 'Contact', to: '#' },
                { label: 'Blog', to: '#' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="transition-colors duration-200 hover:text-parchment-200" style={{ color: 'inherit' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-display" style={{ color: '#d4a870' }}>Categories</h4>
            <ul className="space-y-2.5 text-sm font-body" style={{ color: '#8b6040' }}>
              {['Furniture', 'Appliances', 'Electronics', 'Outdoor'].map(cat => (
                <li key={cat}>
                  <a href="#" className="transition-colors duration-200 hover:text-parchment-200" style={{ color: 'inherit' }}>{cat}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-display" style={{ color: '#d4a870' }}>Support</h4>
            <ul className="space-y-2.5 text-sm font-body" style={{ color: '#8b6040' }}>
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms & Conditions'].map(item => (
                <li key={item}>
                  <a href="#" className="transition-colors duration-200 hover:text-parchment-200" style={{ color: 'inherit' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(196,129,58,0.15)' }}>
          <p className="text-sm font-body" style={{ color: '#5c3d20' }}>
            © 2026 RentEase. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm font-body" style={{ color: '#5c3d20' }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5" stroke="#c4813a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            </svg>
            Crafted for Students & Professionals
          </div>
        </div>
      </div>
    </footer>
  );
}
