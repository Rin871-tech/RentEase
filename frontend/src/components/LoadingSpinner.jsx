import React from 'react';

export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-[3px]',
    lg: 'w-14 h-14 border-4',
  };

  return (
    <div
      className={`${sizes[size]} rounded-full animate-spin ${className}`}
      style={{ borderColor: 'rgba(196,129,58,0.25)', borderTopColor: '#c4813a' }}
      role="status"
      aria-label="Loading"
    />
  );
}

export default function LoadingSpinner({ size = 'md', text = '' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Spinner size={size} />
      {text && (
        <p className="font-medium animate-pulse-soft font-body" style={{ color: '#8b6040' }}>{text}</p>
      )}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(160deg, #3d2512, #2d1b0e)', border: '1px solid rgba(196,129,58,0.15)' }}>
      <div className="h-52 w-full" style={{ background: 'linear-gradient(90deg, #3d2512 25%, #4a2c16 50%, #3d2512 75%)', backgroundSize: '200% 100%', animation: 'shimmer 2s linear infinite' }} />
      <div className="p-6 space-y-4">
        <div className="h-5 w-3/4 rounded-lg" style={{ background: 'rgba(196,129,58,0.1)' }} />
        <div className="h-4 w-1/3 rounded-lg" style={{ background: 'rgba(196,129,58,0.08)' }} />
        <div className="h-16 w-full rounded-xl" style={{ background: 'rgba(196,129,58,0.08)' }} />
        <div className="h-10 w-full rounded-xl" style={{ background: 'rgba(196,129,58,0.12)' }} />
      </div>
    </div>
  );
}

export function PageLoader({ text = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center min-h-[40vh] animate-fade-in">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}
