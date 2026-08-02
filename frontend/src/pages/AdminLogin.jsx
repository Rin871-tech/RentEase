import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginAdmin } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/admin/auth/login', formData);
      loginAdmin(response.data.admin, response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(180deg, rgba(14,7,3,0.98) 0%, rgba(20,9,0,0.96) 100%)' }}>
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div
          className="p-8 rounded-2xl border shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(122,69,17,0.2) 0%, rgba(14,7,3,0.5) 100%)',
            border: '1px solid rgba(196,129,58,0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}>

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #7a4511 0%, #c4813a 100%)' }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#d4a870' }}>Admin Portal</h1>
            <p style={{ color: '#c4a882' }}>Sign in to manage RentEase</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-lg mb-6 border"
              style={{
                background: 'rgba(224,112,96,0.1)',
                border: '1px solid rgba(224,112,96,0.3)'
              }}>
              <span className="text-xl">⚠️</span>
              <p className="text-sm" style={{ color: '#e07060' }}>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#d4a870' }}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@rentease.com"
                className="w-full px-4 py-3 rounded-lg border transition-all duration-200 text-sm"
                style={{
                  background: 'rgba(14,7,3,0.4)',
                  border: '1px solid rgba(196,129,58,0.2)',
                  color: '#d4a870'
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(196,129,58,0.5)';
                  e.target.style.background = 'rgba(14,7,3,0.6)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(196,129,58,0.2)';
                  e.target.style.background = 'rgba(14,7,3,0.4)';
                }}
                required
                disabled={loading}
              />
              <style>{`
                input::placeholder { color: #7a4511; opacity: 0.6; }
              `}</style>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#d4a870' }}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border transition-all duration-200 text-sm"
                style={{
                  background: 'rgba(14,7,3,0.4)',
                  border: '1px solid rgba(196,129,58,0.2)',
                  color: '#d4a870'
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(196,129,58,0.5)';
                  e.target.style.background = 'rgba(14,7,3,0.6)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(196,129,58,0.2)';
                  e.target.style.background = 'rgba(14,7,3,0.4)';
                }}
                required
                disabled={loading}
              />
              <style>{`
                input::placeholder { color: #7a4511; opacity: 0.6; }
              `}</style>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 mt-6"
              style={{
                background: 'linear-gradient(135deg, #c4813a 0%, #d4a870 100%)',
                color: '#14070a',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={e => {
                if (!loading) e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6" style={{ borderTop: '1px solid rgba(196,129,58,0.15)' }}></div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm" style={{ color: '#c4a882' }}>Not an admin? </p>
            <Link to="/" className="text-sm font-semibold transition-colors duration-200 hover:underline"
              style={{ color: '#d4a870' }}>
              Go to home
            </Link>
          </div>
        </div>

        {/* Demo Info Card */}
        <div className="mt-6 p-4 rounded-lg border text-center"
          style={{
            background: 'rgba(196,129,58,0.1)',
            border: '1px solid rgba(196,129,58,0.2)'
          }}>
          <p className="text-xs mb-2" style={{ color: '#c4a882' }}>Demo Credentials:</p>
          <p className="text-xs font-mono" style={{ color: '#d4a870' }}>
            admin@rentease.com / Admin@123
          </p>
        </div>
      </div>
    </div>
  );
}