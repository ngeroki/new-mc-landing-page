'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CompanyStory() {
  const t = useTranslations('story');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src="/images/company-story.jpg"
              alt="New MC Warehouse"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-deep-brown">
              {t('title')}
            </h2>
            <div className="w-20 h-1 bg-warm-sand"></div>
            <p className="text-lg text-deep-brown/80 leading-relaxed">
              {t('content')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

