import React from 'react';

export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-[3px]',
    lg: 'w-14 h-14 border-4',
  };

  return (
    <div
      className={`${sizes[size]} rounded-full border-brand-200 border-t-brand-600 animate-spin ${className}`}
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
        <p className="text-slate-500 font-medium animate-pulse-soft">{text}</p>
      )}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton h-52 w-full rounded-none" />
      <div className="p-6 space-y-4">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/3" />
        <div className="skeleton h-16 w-full rounded-xl" />
        <div className="skeleton h-10 w-full rounded-xl" />
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
