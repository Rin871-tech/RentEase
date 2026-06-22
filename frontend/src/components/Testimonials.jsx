import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Singh',
      role: 'Engineering Student',
      text: 'RentEase made my hostel life so much easier! No need to buy expensive furniture. The wooden pieces look gorgeous too.',
      rating: 5,
      avatar: 'PS',
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Software Engineer',
      text: 'Flexible rentals and great craftsmanship. Highly recommended for relocating professionals! Quality exceeded my expectations.',
      rating: 5,
      avatar: 'RK',
    },
    {
      id: 3,
      name: 'Ananya Patel',
      role: 'MBA Student',
      text: 'The delivery was quick and products are in excellent condition. The rustic feel adds such warmth to my apartment!',
      rating: 5,
      avatar: 'AP',
    },
  ];

  return (
    <section className="py-20 px-4" style={{ background: 'linear-gradient(180deg, #1a0e06 0%, #251208 50%, #1a0e06 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="wood-divider w-16" />
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#c4813a" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
            </svg>
            <div className="wood-divider w-16" />
          </div>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Real stories from real renters across India</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="relative rounded-xl p-8 opacity-0-start animate-fade-in-up transition-all duration-300 hover:-translate-y-1"
              style={{
                animationDelay: `${i * 150}ms`,
                background: 'linear-gradient(160deg, #3d2512 0%, #2d1b0e 100%)',
                border: '1px solid rgba(196,129,58,0.2)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              }}>

              {/* Decorative quote */}
              <div className="absolute top-5 right-6" style={{ color: 'rgba(196,129,58,0.15)' }}>
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Avatar & name */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold font-display"
                  style={{ background: 'linear-gradient(135deg, #7a4511, #c4813a)', color: '#fdf6ec' }}>
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold font-display" style={{ color: '#f0dfc0' }}>{t.name}</h4>
                  <p className="text-sm font-body" style={{ color: '#8b6040' }}>{t.role}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, idx) => (
                  <svg key={idx} className="w-4 h-4" fill="#c4813a" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="leading-relaxed italic font-body" style={{ color: '#c4a882' }}>"{t.text}"</p>

              {/* Bottom accent line */}
              <div className="mt-5 wood-divider" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
