import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const values = [
    { icon: '✨', title: 'Affordability', desc: 'We keep prices low so everyone can have quality furniture', color: 'from-amber-400 to-orange-500' },
    { icon: '♻️', title: 'Sustainability', desc: 'Reduce waste through our eco-friendly rental model', color: 'from-emerald-400 to-teal-600' },
    { icon: '🤝', title: 'Customer First', desc: 'Your satisfaction is our top priority', color: 'from-brand-400 to-brand-600' },
  ];

  const stats = [
    { value: '500+', label: 'Products Available' },
    { value: '10K+', label: 'Happy Customers' },
    { value: '50+', label: 'Cities Covered' },
    { value: '4.8★', label: 'Average Rating' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="hero-gradient text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 opacity-0-start animate-fade-in-up">About RentEase</h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl opacity-0-start animate-fade-in-up animate-delay-200">
            Making furniture rental simple, affordable, and sustainable
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-slate-600 text-lg mb-4 leading-relaxed">
              RentEase makes it easy for students and working professionals to access quality furniture and appliances without the burden of long-term commitments or high upfront costs.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              We believe in sustainable living and reducing unnecessary consumption. Our rental model promotes a circular economy while keeping your living space flexible.
            </p>
          </div>
          <div className="card p-12 flex items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
            <div className="text-8xl animate-float">🏠</div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-surface-50 rounded-3xl py-14 px-8 mb-20">
          <h2 className="section-title">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {values.map((v, i) => (
              <div key={v.title} className="card p-8 opacity-0-start animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-2xl mb-4 shadow-md`}>
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-slate-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <div key={stat.label} className="card p-8 text-center opacity-0-start animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-3xl md:text-4xl font-extrabold text-brand-700 mb-2">{stat.value}</div>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="hero-gradient text-white rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold mb-4">Get in Touch</h2>
            <p className="text-indigo-100 text-lg mb-8">Have questions? We'd love to hear from you!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 text-indigo-100">
              <span>📧 info@rentease.com</span>
              <span>📱 +91 1234 567 890</span>
              <span>📍 Kolhapur, Maharashtra</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
