import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import ProtectedAdminRoute from '../../components/ProtectedAdminRoute';
import LoadingSpinner from '../../components/LoadingSpinner';
import { adminProductsAPI } from '../../services/api';

const CATEGORIES = ['bed', 'sofa', 'table', 'chair', 'fridge', 'washing-machine', 'tv', 'ac'];

function ProductFormContent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'bed',
    monthlyPrice: '',
    securityDeposit: '',
    quantity: '1',
    tenureOptions: [3, 6, 12],
  });

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await adminProductsAPI.getAll({ skip: 0, limit: 100 });
      const product = response.data.products.find((p) => p._id === id);
      if (product) {
        setFormData(product);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('tenure_')) {
      const months = parseInt(name.split('_')[1]);
      if (checked) {
        setFormData({
          ...formData,
          tenureOptions: [...formData.tenureOptions, months],
        });
      } else {
        setFormData({
          ...formData,
          tenureOptions: formData.tenureOptions.filter((m) => m !== months),
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === 'number' ? parseInt(value) : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      if (isEditMode) {
        await adminProductsAPI.update(id, formData);
        setSuccess('Product updated successfully!');
      } else {
        await adminProductsAPI.create(formData);
        setSuccess('Product created successfully!');
        setFormData({
          name: '',
          description: '',
          category: 'bed',
          monthlyPrice: '',
          securityDeposit: '',
          quantity: '1',
          tenureOptions: [3, 6, 12],
        });
      }

      setTimeout(() => {
        navigate('/admin/products');
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Loading product..." />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/admin/products')}
            className="text-2xl text-brand-600 hover:text-brand-700"
          >
            ←
          </button>
          <h1 className="text-3xl font-bold text-slate-900">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>

        <div className="card p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              <span>⚠️</span>
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm">
              <span>✅</span>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Queen Bed"
                className="input-field"
                required
                disabled={submitting}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Product description..."
                className="input-field resize-none h-24"
                disabled={submitting}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                required
                disabled={submitting}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price & Deposit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Price (₹) *</label>
                <input
                  type="number"
                  name="monthlyPrice"
                  value={formData.monthlyPrice}
                  onChange={handleChange}
                  placeholder="e.g., 1000"
                  className="input-field"
                  required
                  min="0"
                  disabled={submitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Security Deposit (₹) *</label>
                <input
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  placeholder="e.g., 5000"
                  className="input-field"
                  required
                  min="0"
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., 5"
                className="input-field"
                min="1"
                disabled={submitting}
              />
            </div>

            {/* Tenure Options */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Rental Tenure Options *</label>
              <div className="space-y-2">
                {[3, 6, 12].map((months) => (
                  <label key={months} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                    <input
                      type="checkbox"
                      name={`tenure_${months}`}
                      checked={formData.tenureOptions.includes(months)}
                      onChange={handleChange}
                      disabled={submitting}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-slate-700">{months} months</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary flex-1"
              >
                {submitting ? <LoadingSpinner size="sm" /> : `💾 ${isEditMode ? 'Update' : 'Create'}`}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                disabled={submitting}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function ProductForm() {
  return <ProtectedAdminRoute element={<ProductFormContent />} />;
}
