'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from '@/routing';
import { useLocale } from 'next-intl';

export default function ProductRange() {
  const t = useTranslations('products');
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const products = [
    { key: 'men', image: '/images/product-men.jpg' },
    { key: 'women', image: '/images/product-women.jpg' },
    { key: 'kids', image: '/images/product-kids.jpg' },
    { key: 'flipflop', image: '/images/product-flipflop.jpg' },
    { key: 'slipper', image: '/images/product-slipper.jpg' },
    { key: 'casual', image: '/images/product-casual.jpg' },
  ];

  return (
    <section id="catalog" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-deep-brown mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-deep-brown/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={t(`${product.key}.title`)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold text-deep-brown mb-3">
                  {t(`${product.key}.title`)}
                </h3>
                <p className="text-base text-deep-brown/70 mb-4 leading-relaxed">
                  {t(`${product.key}.description`)}
                </p>
                <Link
                  href="/#catalog"
                  className="inline-block text-warm-sand font-semibold hover:text-deep-brown transition-colors"
                >
                  {t('viewCatalog')} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

