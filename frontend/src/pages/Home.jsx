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
    { name: 'all', label: 'All Items', icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
    )},
    { name: 'bed', label: 'Beds', icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20v-4a4 4 0 014-4h12a4 4 0 014 4v4M2 20h20M7 12V5a2 2 0 012-2h6a2 2 0 012 2v7"/></svg>
    )},
    { name: 'sofa', label: 'Sofas', icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12V8a2 2 0 012-2h14a2 2 0 012 2v4M3 12a2 2 0 00-2 2v3h22v-3a2 2 0 00-2-2M3 12h18M5 17v2M19 17v2"/></svg>
    )},
    { name: 'table', label: 'Tables', icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="7" width="18" height="3" rx="1"/><path d="M6 10v7M18 10v7"/></svg>
    )},
    { name: 'fridge', label: 'Fridges', icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M5 10h14M10 5v3M10 15v2"/></svg>
    )},
    { name: 'washing-machine', label: 'Washers', icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M7 7h2"/></svg>
    )},
    { name: 'tv', label: 'TVs', icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 20h8M12 18v2"/></svg>
    )},
  ];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: 'Save Up to 80%',
      desc: 'Fraction of the cost of buying new furniture',
      color: 'from-amber-600 to-yellow-700',
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
        </svg>
      ),
      title: 'Flexible Plans',
      desc: 'Rent for 3, 6, or 12 months — your choice',
      color: 'from-rust-600 to-rust-700',
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
        </svg>
      ),
      title: 'Free Delivery',
      desc: 'Professional setup at your doorstep',
      color: 'from-brand-600 to-brand-700',
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"/>
        </svg>
      ),
      title: 'Eco-Friendly',
      desc: 'Circular rental economy, reduce waste',
      color: 'from-emerald-700 to-green-800',
    },
  ];

  return (
    <div className="overflow-hidden" style={{ background: '#1a0e06' }}>

      {/* HERO SECTION */}
      <section className="relative text-parchment-200 overflow-hidden" style={{ minHeight: '90vh' }}>
        {/* Background image with dark overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&q=80"
            alt="Rustic living room"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(14,7,3,0.94) 0%, rgba(26,14,6,0.88) 40%, rgba(20,9,0,0.92) 100%)' }} />
          {/* Wood grain overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(196,129,58,0.3) 4px, rgba(196,129,58,0.3) 5px)'
          }} />
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none animate-pulse-soft"
          style={{ background: 'radial-gradient(circle, rgba(196,129,58,0.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(196,80,26,0.06) 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left content */}
            <div>
              <div className="opacity-0-start animate-fade-in-down animate-delay-100 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium font-body"
                  style={{ background: 'rgba(122,69,17,0.35)', border: '1px solid rgba(196,129,58,0.35)', color: '#d4a870' }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#c4813a' }} />
                  India's #1 Furniture Rental Platform
                </span>
              </div>

              <h1 className="opacity-0-start animate-fade-in-up animate-delay-200 font-display font-bold leading-tight mb-6"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                <span className="text-gradient">Furniture &</span>
                <br />
                <span className="text-gradient">Appliances</span>
                <br />
                <span style={{ color: '#f0dfc0' }}>on Rent</span>
              </h1>

              <p className="opacity-0-start animate-fade-in-up animate-delay-300 text-lg md:text-xl mb-2 max-w-lg font-body"
                style={{ color: '#c4a882' }}>
                Pay Monthly. No Lock-in. Free Delivery & Setup.
              </p>
              <p className="opacity-0-start animate-fade-in-up animate-delay-400 mb-10 font-body" style={{ color: '#8b6040' }}>
                Crafted comfort for students, professionals & short-term stays
              </p>

              {/* Search Bar */}
              <div className="opacity-0-start animate-fade-in-up animate-delay-500 flex flex-col sm:flex-row gap-3 max-w-xl mb-12">
                <div className="relative flex-1">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" fill="none" stroke="#8b6040" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search beds, sofas, appliances..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl font-body focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{
                      background: 'rgba(20,9,0,0.85)',
                      border: '1px solid rgba(196,129,58,0.4)',
                      color: '#f0dfc0',
                      '::placeholder': { color: '#6b4420' }
                    }}
                  />
                </div>
                <button className="btn-accent px-8 py-4 whitespace-nowrap rounded-xl">
                  Search
                </button>
              </div>

              {/* Stats */}
              <div className="opacity-0-start animate-fade-in-up animate-delay-600 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { value: '500+', label: 'Products' },
                  { value: '10K+', label: 'Happy Renters' },
                  { value: '4.8★', label: 'Rating' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl md:text-3xl font-extrabold font-display" style={{ color: '#d4a870' }}>{stat.value}</p>
                    <p className="text-sm font-body" style={{ color: '#8b6040' }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right floating cards */}
            <div className="hidden lg:block relative h-[440px]">
              {/* Card 1 — Sofa */}
              <div className="absolute top-6 right-6 w-56 rounded-xl p-4 animate-float shadow-2xl opacity-0-start animate-scale-in animate-delay-300"
                style={{ background: 'linear-gradient(145deg, #3d2512, #2d1b0e)', border: '1px solid rgba(196,129,58,0.3)' }}>
                <div className="h-28 rounded-xl overflow-hidden mb-3">
                  <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" alt="Sofa" className="w-full h-full object-cover" />
                </div>
                <p className="font-bold text-sm font-display" style={{ color: '#f0dfc0' }}>Premium Sofa Set</p>
                <p className="font-extrabold font-display" style={{ color: '#c4813a' }}>₹899<span className="text-xs font-normal font-body" style={{ color: '#8b6040' }}>/mo</span></p>
              </div>

              {/* Card 2 — Bed */}
              <div className="absolute top-44 left-2 w-52 rounded-xl p-4 animate-float-delayed shadow-2xl opacity-0-start animate-scale-in animate-delay-500"
                style={{ background: 'linear-gradient(145deg, #3d2512, #2d1b0e)', border: '1px solid rgba(196,129,58,0.3)' }}>
                <div className="h-24 rounded-xl overflow-hidden mb-3">
                  <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80" alt="Bed" className="w-full h-full object-cover" />
                </div>
                <p className="font-bold text-sm font-display" style={{ color: '#f0dfc0' }}>Queen Size Bed</p>
                <p className="font-extrabold font-display" style={{ color: '#c4813a' }}>₹599<span className="text-xs font-normal font-body" style={{ color: '#8b6040' }}>/mo</span></p>
              </div>

              {/* Badge — Free Delivery */}
              <div className="absolute bottom-8 right-14 w-52 rounded-xl p-4 shadow-2xl opacity-0-start animate-scale-in animate-delay-600"
                style={{ background: 'linear-gradient(145deg, #3d2512, #2d1b0e)', border: '1px solid rgba(196,129,58,0.3)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #7a4511, #c4813a)' }}>
                    <svg className="w-6 h-6" fill="none" stroke="#fdf6ec" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm font-display" style={{ color: '#f0dfc0' }}>Free Delivery</p>
                    <p className="text-xs font-body" style={{ color: '#8b6040' }}>Within 48 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rustic wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z" fill="#1a0e06" />
          </svg>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(180deg, #1a0e06 0%, #251208 50%, #1a0e06 100%)' }}>
        <div className="max-w-7xl mx-auto">
          {/* Section header with wood accent */}
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="wood-divider w-16" />
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#c4813a">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
              </svg>
              <div className="wood-divider w-16" />
            </div>
            <h2 className="section-title">Why Choose RentEase?</h2>
            <p className="section-subtitle">Trusted by thousands for hassle-free furniture rentals across India</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={feature.title}
                className="card-hover p-8 text-center group opacity-0-start animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  style={{ color: '#fdf6ec' }}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 font-display" style={{ color: '#f0dfc0' }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed font-body" style={{ color: '#8b6040' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal wood divider line */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="wood-divider" />
      </div>

      {/* PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="wood-divider w-16" />
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#c4813a" strokeWidth="2">
              <rect x="5" y="2" width="14" height="9" rx="2"/><rect x="3" y="11" width="18" height="4" rx="1.5"/>
              <rect x="5" y="15" width="3" height="7" rx="1"/><rect x="16" y="15" width="3" height="7" rx="1"/>
            </svg>
            <div className="wood-divider w-16" />
          </div>
          <h2 className="section-title">Browse Our Collection</h2>
          <p className="section-subtitle">Handpicked quality furniture & appliances at honest monthly rates</p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-3 min-w-max justify-center flex-wrap">
            {categories.map((cat) => {
              const isActive = (category === '' && cat.name === 'all') || category === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setCategory(cat.name === 'all' ? '' : cat.name)}
                  className="whitespace-nowrap px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 font-body"
                  style={isActive ? {
                    background: 'linear-gradient(135deg, #a0621e, #c4813a)',
                    color: '#fdf6ec',
                    border: '1px solid rgba(196,129,58,0.5)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    transform: 'scale(1.05)',
                  } : {
                    background: 'rgba(45,27,14,0.8)',
                    color: '#c4a882',
                    border: '1px solid rgba(196,129,58,0.2)',
                  }}>
                  <span style={{ color: isActive ? '#fdf6ec' : '#c4813a' }}>{cat.icon}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 max-w-lg mx-auto rounded-2xl"
            style={{ background: 'linear-gradient(145deg, #3d2512, #2d1b0e)', border: '1px solid rgba(196,129,58,0.2)' }}>
            <div className="text-6xl mb-4">🪑</div>
            <p className="text-lg font-medium font-display" style={{ color: '#f0dfc0' }}>No products found</p>
            <p className="text-sm mt-2 font-body" style={{ color: '#8b6040' }}>Try a different search or category</p>
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
      <section className="relative text-parchment-200 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80"
            alt="Cozy room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(14,7,3,0.93) 0%, rgba(26,14,6,0.88) 100%)' }} />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="wood-divider w-12" />
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#c4813a">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
            </svg>
            <div className="wood-divider w-12" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-5 font-display opacity-0-start animate-fade-in-up"
            style={{ color: '#f0dfc0' }}>
            Ready to Start Renting?
          </h2>
          <p className="text-lg md:text-xl mb-10 font-body opacity-0-start animate-fade-in-up animate-delay-200"
            style={{ color: '#c4a882' }}>
            Join thousands of happy customers saving money with RentEase
          </p>
          <Link to="/register"
            className="inline-flex btn-accent text-lg px-12 py-4 shadow-xl opacity-0-start animate-fade-in-up animate-delay-300">
            Sign Up Now — It's Free!
          </Link>
        </div>
      </section>
    </div>
  );
}
