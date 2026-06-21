import React, { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is the minimum rental period?',
      a: 'The minimum rental period is 3 months. We offer flexible options for 3, 6, or 12 months.',
    },
    {
      q: 'How is delivery and installation handled?',
      a: 'We provide free delivery and installation for all items. Our team will set everything up for you.',
    },
    {
      q: 'What happens if the furniture gets damaged?',
      a: 'Normal wear and tear is covered. Major damages will be charged as per our damage policy.',
    },
    {
      q: 'Can I extend my rental period?',
      a: 'Yes! You can extend your rental period anytime. Just contact our support team.',
    },
    {
      q: 'Is there a security deposit?',
      a: 'Yes, a security deposit is required which is refunded after the rental period ends in good condition.',
    },
    {
      q: 'How do I cancel my rental?',
      a: 'You can cancel anytime by notifying us 2 weeks in advance. Refund policy applies as per terms.',
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Everything you need to know about renting with us</p>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`card overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-card-hover border-brand-100' : ''}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 flex justify-between items-center gap-4 text-left hover:bg-slate-50/50 transition-colors duration-200"
                >
                  <h3 className="font-semibold text-slate-900">{faq.q}</h3>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'bg-brand-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5 border-t border-slate-100">
                    <p className="text-slate-600 pt-4 leading-relaxed">{faq.a}</p>
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
