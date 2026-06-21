import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { CartContext } from '../context/CartContext';
import { PageLoader } from '../components/LoadingSpinner';

const categoryIcons = {
  bed: '🛏️',
  sofa: '🛋️',
  table: '🪑',
  fridge: '🧊',
  'washing-machine': '🧺',
  tv: '📺',
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [tenure, setTenure] = useState(3);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await productsAPI.getById(id);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setAdding(true);
    addToCart(product, tenure);
    await new Promise((r) => setTimeout(r, 600));
    setAdding(false);
    navigate('/cart');
  };

  if (loading) return <PageLoader text="Loading product details..." />;
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="text-6xl mb-4">😕</div>
        <p className="text-slate-600 text-lg font-medium">Product not found</p>
        <button onClick={() => navigate('/')} className="btn-primary mt-6">
          Back to Home
        </button>
      </div>
    );
  }

  const totalCost = product.monthlyPrice * tenure;
  const icon = categoryIcons[product.category] || '📦';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 font-medium mb-8 transition-colors duration-200 group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="card overflow-hidden">
          <div className="h-80 lg:h-[28rem] bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 flex items-center justify-center relative">
            <span className="text-[8rem] drop-shadow-2xl animate-float">{icon}</span>
            <span className="absolute top-4 left-4 badge-brand capitalize">
              {product.category.replace('-', ' ')}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3">{product.name}</h1>
          <p className="text-slate-500 text-lg mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-extrabold text-brand-700">₹{product.monthlyPrice}</span>
            <span className="text-slate-400 font-medium">/ month</span>
          </div>

          <p className="text-sm text-slate-500 mb-8">
            Security Deposit: <span className="font-semibold text-slate-700">₹{product.securityDeposit}</span>
          </p>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Rental Tenure</label>
            <select
              value={tenure}
              onChange={(e) => setTenure(parseInt(e.target.value))}
              className="input-field max-w-xs"
            >
              {product.tenureOptions.map((t) => (
                <option key={t} value={t}>{t} months</option>
              ))}
            </select>
          </div>

          <div className="card p-6 mb-8 bg-gradient-to-br from-slate-50 to-brand-50/30">
            <h3 className="font-bold text-slate-900 mb-4">Price Breakdown</h3>
            <div className="space-y-3 text-sm">
              <p className="flex justify-between text-slate-600">
                <span>Monthly Rent × {tenure} months</span>
                <span className="font-semibold">₹{product.monthlyPrice * tenure}</span>
              </p>
              <p className="flex justify-between text-slate-600">
                <span>Security Deposit</span>
                <span className="font-semibold">₹{product.securityDeposit}</span>
              </p>
              <p className="flex justify-between text-lg font-extrabold text-brand-700 border-t border-slate-200 pt-3">
                <span>Total Cost</span>
                <span>₹{totalCost + product.securityDeposit}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="w-full btn-primary py-4 text-lg"
          >
            {adding ? 'Adding to Cart...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
