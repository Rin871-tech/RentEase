import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/LoadingSpinner';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productsAPI.getAll(category || null);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  const categories = [
    { name: 'all', label: 'All Products', icon: '📦' },
    { name: 'bed', label: 'Beds', icon: '🛏️' },
    { name: 'sofa', label: 'Sofas', icon: '🛋️' },
    { name: 'table', label: 'Tables', icon: '🪑' },
    { name: 'fridge', label: 'Refrigerators', icon: '🧊' },
    { name: 'washing-machine', label: 'Washers', icon: '🧺' },
    { name: 'tv', label: 'TVs', icon: '📺' },
  ];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const features = [
    { icon: '💰', title: 'Save Money', desc: 'Save up to 80% compared to buying new', color: 'from-emerald-500 to-teal-600' },
    { icon: '🔄', title: 'Flexible Plans', desc: 'Rent for 3, 6, or 12 months — your choice', color: 'from-brand-500 to-brand-700' },
    { icon: '🚚', title: 'Free Delivery', desc: 'Free delivery & professional installation', color: 'from-violet-500 to-purple-700' },
    { icon: '♻️', title: 'Eco-Friendly', desc: 'Sustainable circular rental economy', color: 'from-amber-500 to-orange-600' },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative hero-gradient text-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse-soft" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-300/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-float" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <div className="opacity-0-start animate-fade-in-down animate-delay-100">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  India's #1 Furniture Rental Platform
                </span>
              </div>

              <h1 className="opacity-0-start animate-fade-in-up animate-delay-200 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                <span className="text-gradient">Furniture & Appliances</span>
                <br />
                <span className="text-white">on Rent</span>
              </h1>

              <p className="opacity-0-start animate-fade-in-up animate-delay-300 text-lg md:text-xl text-indigo-100 mb-2 max-w-lg">
                Pay Monthly. No Lock-in. Free Delivery & Setup.
              </p>
              <p className="opacity-0-start animate-fade-in-up animate-delay-400 text-indigo-200/80 mb-8">
                Perfect for students, professionals & short-term stays
              </p>

              {/* Search Bar */}
              <div className="opacity-0-start animate-fade-in-up animate-delay-500 flex flex-col sm:flex-row gap-3 max-w-xl mb-10">
                <div className="relative flex-1">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search beds, sofas, appliances..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl text-slate-900 bg-white shadow-xl shadow-black/10 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 placeholder:text-slate-400"
                  />
                </div>
                <button className="btn-accent px-8 py-4 shadow-xl shadow-black/10 whitespace-nowrap">
                  Search
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="opacity-0-start animate-fade-in-up animate-delay-600 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { value: '500+', label: 'Products' },
                  { value: '10K+', label: 'Happy Users' },
                  { value: '4.8★', label: 'Rating' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl md:text-3xl font-extrabold">{stat.value}</p>
                    <p className="text-indigo-200 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right floating cards */}
            <div className="hidden lg:block relative h-[420px]">
              <div className="absolute top-8 right-8 w-56 card p-4 animate-float shadow-2xl opacity-0-start animate-scale-in animate-delay-300">
                <div className="h-28 bg-gradient-to-br from-brand-100 to-brand-200 rounded-xl flex items-center justify-center text-5xl mb-3">🛋️</div>
                <p className="font-bold text-slate-900 text-sm">Premium Sofa Set</p>
                <p className="text-brand-600 font-extrabold">₹899<span className="text-xs text-slate-400 font-normal">/mo</span></p>
              </div>
              <div className="absolute top-36 left-4 w-52 card p-4 animate-float-delayed shadow-2xl opacity-0-start animate-scale-in animate-delay-500">
                <div className="h-24 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-xl flex items-center justify-center text-4xl mb-3">🛏️</div>
                <p className="font-bold text-slate-900 text-sm">Queen Size Bed</p>
                <p className="text-brand-600 font-extrabold">₹599<span className="text-xs text-slate-400 font-normal">/mo</span></p>
              </div>
              <div className="absolute bottom-8 right-16 w-48 card p-4 animate-float shadow-2xl opacity-0-start animate-scale-in animate-delay-600">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl">🚚</div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Free Delivery</p>
                    <p className="text-xs text-slate-500">Within 48 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-surface-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title">Why Choose RentEase?</h2>
          <p className="section-subtitle">
            Join thousands who trust us for hassle-free furniture rentals
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="card-hover p-8 text-center group opacity-0-start animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="section-title">Browse Our Collection</h2>
        <p className="section-subtitle">
          Premium quality furniture & appliances at affordable monthly rates
        </p>

        {/* Category Filter */}
        <div className="mb-12 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-3 min-w-max justify-center flex-wrap">
            {categories.map((cat) => {
              const isActive = (category === '' && cat.name === 'all') || category === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setCategory(cat.name === 'all' ? '' : cat.name)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-500/30 scale-105'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-200 hover:text-brand-600 hover:shadow-md'
                  }`}
                >
                  <span className="mr-1.5">{cat.icon}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 card max-w-lg mx-auto">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-slate-600 text-lg font-medium">No products found</p>
            <p className="text-slate-400 text-sm mt-2">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, i) => (
              <div key={product._id} style={{ animationDelay: `${(i % 6) * 80}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      <Testimonials />
      <FAQ />

      {/* CTA SECTION */}
      <section className="relative hero-gradient text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 opacity-0-start animate-fade-in-up">
            Ready to Start Renting?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-indigo-100 opacity-0-start animate-fade-in-up animate-delay-200">
            Join thousands of happy customers saving money with RentEase
          </p>
          <Link
            to="/register"
            className="inline-flex btn-accent text-lg px-10 py-4 shadow-xl opacity-0-start animate-fade-in-up animate-delay-300"
          >
            Sign Up Now — It's Free!
          </Link>
        </div>
      </section>
    </div>
  );
}
