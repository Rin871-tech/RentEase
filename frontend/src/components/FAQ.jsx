import React, { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is the minimum rental period?',
      a: 'The minimum rental period is 3 months. We offer flexible options for 3, 6, or 12 months to suit your needs.',
    },
    {
      q: 'How is delivery and installation handled?',
      a: 'We provide free delivery and professional installation for all items. Our skilled team will set everything up beautifully for you.',
    },
    {
      q: 'What happens if the furniture gets damaged?',
      a: 'Normal wear and tear is covered. Major damages will be assessed and charged as per our transparent damage policy.',
    },
    {
      q: 'Can I extend my rental period?',
      a: 'Absolutely! You can extend your rental period anytime. Just contact our support team and we\'ll handle the rest.',
    },
    {
      q: 'Is there a security deposit?',
      a: 'Yes, a refundable security deposit is required. It is fully returned after the rental period ends in good condition.',
    },
    {
      q: 'How do I cancel my rental?',
      a: 'You can cancel anytime by notifying us 2 weeks in advance. Refund terms apply as per our straightforward rental policy.',
    },
  ];

  return (
    <section className="py-20 px-4" style={{ background: 'linear-gradient(180deg, #1a0e06 0%, #140900 100%)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="wood-divider w-16" />
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#c4813a" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div className="wood-divider w-16" />
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about renting with us</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(160deg, #3d2512 0%, #2d1b0e 100%)',
                  border: isOpen ? '1px solid rgba(196,129,58,0.45)' : '1px solid rgba(196,129,58,0.18)',
                  boxShadow: isOpen ? '0 8px 20px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.3)',
                }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 flex justify-between items-center gap-4 text-left transition-colors duration-200"
                  style={{ background: 'transparent' }}>
                  <h3 className="font-semibold font-display" style={{ color: isOpen ? '#d4a870' : '#f0dfc0' }}>
                    {faq.q}
                  </h3>
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isOpen ? 'linear-gradient(135deg, #a0621e, #c4813a)' : 'rgba(45,27,14,0.8)',
                      color: isOpen ? '#fdf6ec' : '#8b6040',
                      border: '1px solid rgba(196,129,58,0.3)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '12rem' : '0', opacity: isOpen ? 1 : 0 }}>
                  <div className="px-5 pb-5" style={{ borderTop: '1px solid rgba(196,129,58,0.15)' }}>
                    <p className="pt-4 leading-relaxed font-body" style={{ color: '#c4a882' }}>{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
