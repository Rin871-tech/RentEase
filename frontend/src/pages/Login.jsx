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
      {/* Backdrop */}
      <Link
        to="/"
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        aria-label="Close and go home"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md animate-scale-in">
        <div className="bg-white rounded-3xl shadow-modal overflow-hidden">
          {/* Header gradient */}
          <div className="hero-gradient px-8 pt-8 pb-12 relative">
            <Link
              to="/"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors duration-200"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <span className="text-white text-xl font-bold">R</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                <p className="text-indigo-200 text-sm">Sign in to your RentEase account</p>
              </div>
            </div>
          </div>

          {/* Form body — overlaps header */}
          <div className="px-8 pb-8 -mt-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm animate-fade-in">
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
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
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3.5 mt-2"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Spinner size="sm" />
                      Signing In...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-center text-slate-500 text-sm">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-brand-600 font-bold hover:text-brand-700 transition-colors">
                    Sign Up Free
                  </Link>
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex justify-center gap-6 mt-5 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.004 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.684.056-1.354.166-2.004zm4.582 4.096a1 1 0 011.414 0L10 11.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Secure Login
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
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
