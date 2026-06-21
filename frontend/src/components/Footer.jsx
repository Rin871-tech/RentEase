import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <span className="text-white text-sm font-bold">R</span>
              </div>
              <span className="text-white font-bold text-lg">RentEase</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Making furniture rental affordable, flexible, and sustainable for everyone.
            </p>
            <div className="mt-5 flex gap-3">
              {['facebook', 'twitter', 'instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                  aria-label={social}
                >
                  <span className="text-sm capitalize">{social[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors duration-200">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors duration-200">About</Link></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Furniture</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Appliances</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Electronics</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2026 RentEase. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Made with care for Students & Professionals
          </p>
        </div>
      </div>
    </footer>
  );
}
