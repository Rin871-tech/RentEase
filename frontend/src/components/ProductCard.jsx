import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const categoryFallbackImages = {
  bed: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  sofa: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  table: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=800&q=80',
  fridge: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80',
  'washing-machine': 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&q=80',
  tv: 'https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=800&q=80',
};

const categoryLabels = {
  bed: 'Bedroom',
  sofa: 'Living Room',
  table: 'Dining',
  fridge: 'Appliance',
  'washing-machine': 'Appliance',
  tv: 'Electronics',
};

const categoryIcons = {
  bed: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 20v-4a4 4 0 014-4h12a4 4 0 014 4v4M2 20h20M7 12V5a2 2 0 012-2h6a2 2 0 012 2v7"/>
    </svg>
  ),
  sofa: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12V8a2 2 0 012-2h14a2 2 0 012 2v4M3 12a2 2 0 00-2 2v3h22v-3a2 2 0 00-2-2M3 12h18M5 17v2M19 17v2"/>
    </svg>
  ),
  table: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="7" width="18" height="3" rx="1"/>
      <path strokeLinecap="round" d="M6 10v7M18 10v7"/>
    </svg>
  ),
  fridge: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="2" width="14" height="20" rx="2"/>
      <path strokeLinecap="round" d="M5 10h14M10 5v3M10 15v2"/>
    </svg>
  ),
  'washing-machine': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="12" cy="13" r="4"/>
      <path strokeLinecap="round" d="M7 7h2"/>
    </svg>
  ),
  tv: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="4" width="20" height="14" rx="2"/>
      <path strokeLinecap="round" d="M8 20h8M12 18v2"/>
    </svg>
  ),
};

export default function ProductCard({ product }) {
  const label = categoryLabels[product.category] || product.category.replace('-', ' ');
  const isPopular = product.monthlyPrice <= 999;
  const isNew = product._id && parseInt(product._id.slice(-2), 16) % 3 === 0;
  const imgSrc = product.image || categoryFallbackImages[product.category] || '';
  const [imgError, setImgError] = useState(false);
  const CategoryIcon = categoryIcons[product.category];

  return (
    <Link to={`/product/${product._id}`} className="group block h-full">
      <article className="rounded-xl overflow-hidden h-full flex flex-col opacity-0-start animate-fade-in-up transition-all duration-300 hover:-translate-y-1"
        style={{
          background: 'linear-gradient(160deg, #3d2512 0%, #2d1b0e 100%)',
          border: '1px solid rgba(196,129,58,0.2)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(196,129,58,0.45)';
          e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.5), 0 4px 8px rgba(196,129,58,0.15)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(196,129,58,0.2)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
        }}>

        {/* Image */}
        <div className="relative h-52 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #3d2512, #251208)' }}>
          {imgSrc && !imgError ? (
            <img
              src={imgSrc}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              style={{ filter: 'brightness(0.88) saturate(0.85)' }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3d2512, #251208)' }}>
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="#7a4511" strokeWidth="1.5">
                <rect x="5" y="2" width="14" height="9" rx="2"/>
                <rect x="3" y="11" width="18" height="4" rx="1.5"/>
                <rect x="5" y="15" width="3" height="7" rx="1"/>
                <rect x="16" y="15" width="3" height="7" rx="1"/>
              </svg>
            </div>
          )}

          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rustic border overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)' }} />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {isNew && (
              <span className="badge-accent shadow-sm">New</span>
            )}
            {isPopular && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase font-body"
                style={{ background: 'rgba(20,9,0,0.75)', color: '#c4813a', border: '1px solid rgba(196,129,58,0.4)' }}>
                Best Value
              </span>
            )}
          </div>

          {/* View hint */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="text-xs font-semibold font-body px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(14,7,3,0.75)', color: '#d4a870', border: '1px solid rgba(196,129,58,0.3)' }}>
              View Details →
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          {/* Category row */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide font-body"
              style={{ background: 'rgba(122,69,17,0.35)', color: '#c4813a', border: '1px solid rgba(196,129,58,0.25)' }}>
              <span style={{ color: '#c4813a' }}>{CategoryIcon}</span>
              {label}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-base font-bold mb-3 line-clamp-2 font-display transition-colors duration-200"
            style={{ color: '#f0dfc0' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#d4a870'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#f0dfc0'; }}>
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm mb-4 line-clamp-2 flex-1 font-body" style={{ color: '#8b6040' }}>
            {product.description}
          </p>

          {/* Pricing */}
          <div className="p-4 rounded-xl mb-4" style={{ background: 'rgba(20,9,0,0.5)', border: '1px solid rgba(196,129,58,0.15)' }}>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold font-display" style={{ color: '#c4813a' }}>₹{product.monthlyPrice}</span>
              <span className="text-sm font-body" style={{ color: '#8b6040' }}>/month</span>
            </div>
            <p className="text-xs mt-1 font-body" style={{ color: '#5c3d20' }}>
              Deposit: <span className="font-medium" style={{ color: '#8b6040' }}>₹{product.securityDeposit}</span>
            </p>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4" fill="#c4813a" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-body" style={{ color: '#5c3d20' }}>(240+ reviews)</span>
          </div>

          <span className="w-full btn-primary text-center text-sm py-2.5">
            Rent Now
          </span>
        </div>
      </article>
    </Link>
  );
}
