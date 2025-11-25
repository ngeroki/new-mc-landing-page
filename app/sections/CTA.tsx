'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import WhatsAppButton from '../components/WhatsAppButton';

export default function CTA() {
  const t = useTranslations('cta');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-24 bg-[#FDFBF7]" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-deep-brown">
            {t('headline')}
          </h2>
          <p className="text-lg md:text-xl text-deep-brown/80 max-w-2xl mx-auto">
            {t('subheadline')}
          </p>
          <div className="pt-6">
            <WhatsAppButton />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

