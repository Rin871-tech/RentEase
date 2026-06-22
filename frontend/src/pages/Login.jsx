import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Spinner } from '../components/LoadingSpinner';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authAPI.login(formData);
      login(response.data.user, response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with rustic room */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80"
          alt="Rustic room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(14,7,3,0.85)', backdropFilter: 'blur(3px)' }} />
      </div>
      <Link to="/" className="absolute inset-0" aria-label="Close and go home" />

      {/* Modal */}
      <div className="relative w-full max-w-md animate-scale-in">
        <div className="rounded-2xl overflow-hidden shadow-modal" style={{ border: '1px solid rgba(196,129,58,0.3)' }}>

          {/* Header */}
          <div className="px-8 pt-8 pb-12 relative"
            style={{ background: 'linear-gradient(160deg, #3d2512 0%, #251208 100%)' }}>
            {/* Top wood grain texture */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(196,129,58,0.5) 3px, rgba(196,129,58,0.5) 4px)' }} />

            <Link to="/" className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
              style={{ background: 'rgba(196,129,58,0.2)', color: '#d4a870' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(196,129,58,0.35)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(196,129,58,0.2)'}
              aria-label="Close">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>

            <div className="relative flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7a4511, #c4813a)', border: '1px solid rgba(196,129,58,0.4)' }}>
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="2" width="14" height="9" rx="2" fill="#fdf6ec" opacity="0.9"/>
                  <rect x="3" y="11" width="18" height="4" rx="1.5" fill="#fdf6ec"/>
                  <rect x="5" y="15" width="3" height="7" rx="1" fill="#fdf6ec" opacity="0.8"/>
                  <rect x="16" y="15" width="3" height="7" rx="1" fill="#fdf6ec" opacity="0.8"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold font-display" style={{ color: '#f0dfc0' }}>Welcome Back</h1>
                <p className="text-sm font-body" style={{ color: '#8b6040' }}>Sign in to your RentEase account</p>
              </div>
            </div>
          </div>

          {/* Form body */}
          <div className="px-8 pb-8 -mt-6"
            style={{ background: 'linear-gradient(180deg, #251208 0%, #1a0e06 100%)' }}>
            <div className="rounded-xl p-6" style={{ background: 'rgba(45,27,14,0.8)', border: '1px solid rgba(196,129,58,0.2)' }}>
              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl mb-5 text-sm animate-fade-in font-body"
                  style={{ background: 'rgba(196,80,26,0.15)', border: '1px solid rgba(196,80,26,0.4)', color: '#e07060' }}>
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 font-body" style={{ color: '#c4a882' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 font-body" style={{ color: '#c4a882' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="input-field"
                  />
                </div>

                <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 mt-2">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Spinner size="sm" />
                      Signing In...
                    </span>
                  ) : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(196,129,58,0.15)' }}>
                <p className="text-center text-sm font-body" style={{ color: '#8b6040' }}>
                  Don't have an account?{' '}
                  <Link to="/register" className="font-bold transition-colors" style={{ color: '#c4813a' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#d4a870'}
                    onMouseLeave={e => e.currentTarget.style.color = '#c4813a'}>
                    Sign Up Free
                  </Link>
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex justify-center gap-6 mt-5 text-xs font-body" style={{ color: '#5c3d20' }}>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#c4813a' }}>
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.004 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.684.056-1.354.166-2.004zm4.582 4.096a1 1 0 011.414 0L10 11.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Secure Login
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#c4813a' }}>
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Data Protected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
