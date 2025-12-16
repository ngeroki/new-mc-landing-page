'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import WhatsAppButton from '../components/WhatsAppButton';
import { Link } from '@/routing';

export default function CTA() {
  const t = useTranslations('cta');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#FDFBF7]" ref={ref}>
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-heading font-semibold text-deep-brown">
            {t('headline')}
          </h2>
          <p className="text-base md:text-xl text-deep-brown/80 max-w-2xl mx-auto">
            {t('subheadline')}
          </p>
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-md bg-deep-brown text-white hover:bg-[#3A2819] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('catalogButton')}
            </Link>
            <WhatsAppButton />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

