import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import adminApi from '../../services/adminApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import AdminLayout from '../../components/AdminLayout';

export default function AdminProducts() {
  const navigate = useNavigate();
  const { adminToken, logoutAdmin } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }
    fetchProducts();
  }, [adminToken]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getProducts(adminToken);
      setProducts(response.data.products);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load products');
      if (err.response?.status === 401) {
        logoutAdmin();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await adminApi.deleteProduct(id, adminToken);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete product');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          <Link to="/admin/products/add" className="btn-primary">
            ➕ Add Product
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="card bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Products Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{product.category}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">₹{product.rentalPrice}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {products.length === 0 && (
          <div className="card text-center p-12">
            <p className="text-slate-600 mb-4">No products found</p>
            <Link to="/admin/products/add" className="btn-primary">
              Add your first product
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}