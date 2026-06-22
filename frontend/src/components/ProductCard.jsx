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

export default function 
  ProductCard({ product }) {
const label = categoryLabels[product.category] || product.category.replace('-', ' ');
  const isPopular = product.monthlyPrice <= 999;
 const isNew = product._id && parseInt(product._id.slice(-2), 16) % 3 === 0;
  const imgSrc = product.image || categoryFallbackImages[product.category] || '';
  const [imgError, setImgError] = useState(false);
  return (
    <Link to={`/product/${product._id}`} className="group block h-full">
      <article className="card-hover overflow-hidden h-full flex flex-col opacity-0-start animate-fade-in-up">
        {/* Image Area */}
  <div className="relative h-52 overflow-hidden bg-slate-100">
          {imgSrc && !imgError ? (
            <img
              src={imgSrc}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 flex items-center justify-center">
              <span className="text-7xl drop-shadow-lg">📦</span>
            </div>
          )}

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {isNew && (
              <span className="badge-accent shadow-sm">New</span>
            )}
            {isPopular && (
              <span className="badge-success shadow-sm">Best Value</span>
            )}
          </div>

          {/* Quick view hint */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="text-xs font-semibold text-white bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
              View Details →
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base font-bold text-slate-900 line-clamp-2 group-hover:text-brand-700 transition-colors duration-200">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="badge-brand capitalize">{label}</span>
            <span className="badge bg-slate-100 text-slate-500 ring-1 ring-slate-200 capitalize text-[10px]">
              {product.category.replace('-', ' ')}
            </span>
          </div>

          <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Pricing */}
          <div className="bg-gradient-to-br from-slate-50 to-brand-50/50 p-4 rounded-xl mb-4 border border-slate-100 group-hover:border-brand-100 transition-colors duration-300">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-brand-700">₹{product.monthlyPrice}</span>
              <span className="text-sm text-slate-500 font-medium">/month</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Deposit: <span className="text-slate-600 font-medium">₹{product.securityDeposit}</span>
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-slate-400">(240+ reviews)</span>
          </div>

          <span className="w-full btn-primary text-center text-sm py-2.5 group-hover:shadow-glow transition-shadow duration-300">
            Rent Now
          </span>
        </div>
      </article>
    </Link>
  );
}
