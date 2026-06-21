import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import ProtectedAdminRoute from '../../components/ProtectedAdminRoute';
import LoadingSpinner from '../../components/LoadingSpinner';
import { adminProductsAPI } from '../../services/api';

function ProductsContent() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await adminProductsAPI.getAll();
      setProducts(response.data.products);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminProductsAPI.delete(id);
      setProducts(products.filter((p) => p._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete product');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Loading products..." />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          <button
            onClick={() => navigate('/admin/products/add')}
            className="btn-primary"
          >
            ➕ Add Product
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            <span>⚠️</span>
            {error}
          </div>
        )}

        {products.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-slate-500 text-lg">No products yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product._id} className="card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{product.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full font-medium capitalize">
                      {product.category}
                    </span>
                    <span className="text-slate-700">₹{product.monthlyPrice}/mo</span>
                    <span className="text-slate-700">Qty: {product.quantity}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                    className="flex-1 sm:flex-0 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium transition-colors text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(product._id)}
                    className="flex-1 sm:flex-0 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-colors text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card p-6 max-w-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Product?</h3>
              <p className="text-slate-600 text-sm mb-6">Are you sure? This action cannot be undone.</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default function Products() {
  return <ProtectedAdminRoute element={<ProductsContent />} />;
}
