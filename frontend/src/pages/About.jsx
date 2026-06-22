import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const values = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: 'Affordability',
      desc: 'We keep prices low so everyone can have quality furniture in their home.',
      color: 'from-amber-600 to-yellow-700',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"/>
        </svg>
      ),
      title: 'Sustainability',
      desc: 'Reduce waste through our eco-friendly circular rental model.',
      color: 'from-emerald-700 to-green-800',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
        </svg>
      ),
      title: 'Customer First',
      desc: 'Your comfort and satisfaction drive every decision we make.',
      color: 'from-rust-600 to-rust-700',
    },
  ];

  const stats = [
    { value: '500+', label: 'Products Available' },
    { value: '10K+', label: 'Happy Customers' },
    { value: '50+', label: 'Cities Covered' },
    { value: '4.8★', label: 'Average Rating' },
  ];

  return (
    <div className="animate-fade-in" style={{ background: '#1a0e06' }}>

      {/* Hero */}
      <section className="relative text-parchment-200 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80"
            alt="Cozy room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(14,7,3,0.93) 0%, rgba(26,14,6,0.85) 100%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="wood-divider w-12" />
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#c4813a">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 opacity-0-start animate-fade-in-up font-display"
            style={{ color: '#f0dfc0' }}>
            About RentEase
          </h1>
          <p className="text-lg md:text-xl max-w-2xl opacity-0-start animate-fade-in-up animate-delay-200 font-body"
            style={{ color: '#c4a882' }}>
            Making furniture rental simple, affordable, and sustainably crafted for every home.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="wood-divider w-8" />
              <span className="text-sm font-semibold uppercase tracking-widest font-body" style={{ color: '#c4813a' }}>Our Story</span>
            </div>
            <h2 className="text-3xl font-extrabold mb-6 font-display" style={{ color: '#f0dfc0' }}>Our Mission</h2>
            <p className="text-lg mb-4 leading-relaxed font-body" style={{ color: '#c4a882' }}>
              RentEase makes it easy for students and working professionals to access quality furniture and appliances without the burden of long-term commitments or high upfront costs.
            </p>
            <p className="text-lg leading-relaxed font-body" style={{ color: '#8b6040' }}>
              We believe in sustainable living and reducing unnecessary consumption. Our rental model promotes a circular economy while keeping your living space warm and flexible.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden h-72 relative"
            style={{ border: '1px solid rgba(196,129,58,0.25)' }}>
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
              alt="Cozy furniture"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.75) saturate(0.8)' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26,14,6,0.5), transparent)' }} />
          </div>
        </div>

        {/* Values */}
        <div className="rounded-3xl py-14 px-8 mb-20"
          style={{ background: 'linear-gradient(160deg, #251208 0%, #1a0e06 100%)', border: '1px solid rgba(196,129,58,0.15)' }}>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="wood-divider w-12" />
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#c4813a">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
              </svg>
              <div className="wood-divider w-12" />
            </div>
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={v.title}
                className="p-8 rounded-xl opacity-0-start animate-fade-in-up"
                style={{
                  animationDelay: `${i * 100}ms`,
                  background: 'linear-gradient(160deg, #3d2512, #2d1b0e)',
                  border: '1px solid rgba(196,129,58,0.2)',
                }}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-4 shadow-md`}
                  style={{ color: '#fdf6ec' }}>
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 font-display" style={{ color: '#f0dfc0' }}>{v.title}</h3>
                <p className="font-body" style={{ color: '#8b6040' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <div key={stat.label}
              className="p-8 text-center rounded-xl opacity-0-start animate-fade-in-up"
              style={{
                animationDelay: `${i * 100}ms`,
                background: 'linear-gradient(160deg, #3d2512, #2d1b0e)',
                border: '1px solid rgba(196,129,58,0.2)',
              }}>
              <div className="text-3xl md:text-4xl font-extrabold mb-2 font-display" style={{ color: '#c4813a' }}>
                {stat.value}
              </div>
              <p className="text-sm font-body" style={{ color: '#8b6040' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80"
              alt="Wood background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'rgba(14,7,3,0.9)' }} />
          </div>
          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="wood-divider w-12" />
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#c4813a">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
              </svg>
              <div className="wood-divider w-12" />
            </div>
            <h2 className="text-3xl font-extrabold mb-4 font-display" style={{ color: '#f0dfc0' }}>Get in Touch</h2>
            <p className="text-lg mb-8 font-body" style={{ color: '#c4a882' }}>Have questions? We'd love to hear from you!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 font-body" style={{ color: '#8b6040' }}>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="#c4813a" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                info@rentease.com
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="#c4813a" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +91 1234 567 890
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="#c4813a" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Kolhapur, Maharashtra
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
