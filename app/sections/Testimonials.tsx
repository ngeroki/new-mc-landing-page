'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const testimonials = [
    { key: 'testimonial1' },
    { key: 'testimonial2' },
    { key: 'testimonial3' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white" ref={ref}>
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-5xl lg:text-6xl font-heading font-semibold text-deep-brown text-center mb-16"
        >
          {t('title')}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-6">
                <svg className="w-8 h-8 text-warm-sand" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.984z" />
                </svg>
              </div>
              <p className="text-base text-deep-brown/80 mb-6 leading-relaxed italic">
                "{t(`${testimonial.key}.text`)}"
              </p>
              <p className="text-sm font-semibold text-deep-brown">
                — {t(`${testimonial.key}.author`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

