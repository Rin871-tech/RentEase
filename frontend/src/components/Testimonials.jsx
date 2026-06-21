import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Singh',
      role: 'Engineering Student',
      text: 'RentEase made my hostel life so much easier! No need to buy expensive furniture.',
      rating: 5,
      image: '👩‍🎓',
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Software Engineer',
      text: 'Flexible rentals and great service. Highly recommended for relocating professionals!',
      rating: 5,
      image: '👨‍💼',
    },
    {
      id: 3,
      name: 'Ananya Patel',
      role: 'MBA Student',
      text: 'The delivery was quick and products are in excellent condition. Great value!',
      rating: 5,
      image: '👩‍🎓',
    },
  ];

  return (
    <section className="bg-surface-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-subtitle">Real stories from real renters across India</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.id}
              className="card-hover p-8 relative opacity-0-start animate-fade-in-up"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="absolute top-6 right-6 text-brand-100">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center text-3xl">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-0.5 mb-4">
                {[...Array(testimonial.rating)].map((_, idx) => (
                  <svg key={idx} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
