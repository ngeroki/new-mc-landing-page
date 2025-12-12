'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from '@/routing';
import { products } from '@/app/data/products';

export default function ProductRange() {
  const t = useTranslations('products');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Use specific best-quality lifestyle images for homepage
  const productStats = [
    {
      key: 'men',
      count: products.filter(p => p.category === 'men').length,
      image: '/mcpolo/219a-man/219a-man-Lifestyle-02.png', // Full body shot
      link: '/catalog?category=men'
    },
    {
      key: 'women',
      count: products.filter(p => p.category === 'women').length,
      image: '/mcpolo/teplek/teplek-Lifestyle-01.png', // Full body shot
      link: '/catalog?category=women'
    },
    {
      key: 'kids',
      count: products.filter(p => p.category === 'kids').length,
      image: '/mcpolo/7806-35/7806-35-Lifestyle-01.png', // Kid wearing sandals
      link: '/catalog?category=kids'
    },
  ];

  return (
    <section id="catalog" className="py-16 md:py-24 bg-[#FEF1DE]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-deep-brown mb-3 md:mb-4">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg text-deep-brown/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {productStats.map((product, index) => (
            <motion.div
              key={product.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="relative w-full h-80 sm:h-96 overflow-hidden bg-gradient-to-br from-warm-sand/20 to-deep-brown/10">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={t(`${product.key}.title`)}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-deep-brown/30 text-6xl">
                    📦
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 md:p-4">
                  <div className="text-white text-xl md:text-2xl font-bold">
                    {product.count} Produk
                  </div>
                </div>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-heading font-semibold text-deep-brown mb-2 md:mb-3">
                  {t(`${product.key}.title`)}
                </h3>
                <p className="text-sm md:text-base text-deep-brown/70 mb-3 md:mb-4 leading-relaxed">
                  {t(`${product.key}.description`)}
                </p>
                <Link
                  href={product.link}
                  className="inline-block text-warm-sand font-semibold hover:text-deep-brown transition-colors text-sm md:text-base"
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
