'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link, useRouter } from '@/routing';
import { products, Product } from '@/app/data/products';
import ProductCard from '@/app/components/ProductCard';

type FilterType = 'bestsellers' | 'new';

function CategorySection({
  category,
  title,
  index,
  t
}: {
  category: 'men' | 'women' | 'kids';
  title: string;
  index: number;
  t: (key: string) => string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState<'bestsellers' | 'new'>('bestsellers');

  // Get all products for the category and apply filter
  const allCategoryProducts = products.filter(p => p.category === category);
  const filteredProducts = allCategoryProducts.filter(p => {
    if (filter === 'bestsellers') return p.isBestseller;
    if (filter === 'new') return p.isNew;
    return false;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={sectionRef} className="py-20 first:pt-0 border-b border-deep-brown/5 last:border-0 overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto relative group/section">

        {/* Header: Center Title & Filters */}
        <div className="flex flex-col items-center justify-center mb-12 space-y-6">
          {/* Category Title - Centered with Link */}
          <Link href={`/catalog?category=${category}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <h2 className="text-xl md:text-6xl font-heading font-normal text-deep-brown tracking-tight text-center group-hover:text-warm-sand transition-colors duration-300">
                {title}
              </h2>
              {/* Product Count */}
              <p className="text-sm text-deep-brown/50 font-medium group-hover:text-warm-sand/70 transition-colors duration-300">
                {allCategoryProducts.length} {t('productsAvailable')}
              </p>
            </motion.div>
          </Link>

          {/* Filter Toggles - Only New Arrivals and Best Sellers */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={() => setFilter('new')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${filter === 'new'
                ? 'bg-deep-brown text-white border-deep-brown shadow-lg scale-105'
                : 'bg-white text-deep-brown/70 border-deep-brown/20 hover:border-deep-brown/40 hover:text-deep-brown'
                }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {t('newArrivals')}
              </span>
            </button>
            <button
              onClick={() => setFilter('bestsellers')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${filter === 'bestsellers'
                ? 'bg-deep-brown text-white border-deep-brown shadow-lg scale-105'
                : 'bg-white text-deep-brown/70 border-deep-brown/20 hover:border-deep-brown/40 hover:text-deep-brown'
                }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                {t('bestsellers')}
              </span>
            </button>
          </motion.div>
        </div>

        {/* Product Carousel (Horizontal Scroll) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative min-h-[400px]"
        >
          {filteredProducts.length > 0 ? (
            <div className="relative">
              {/* Scroll Button Left */}
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-12 h-12 bg-white/95 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center text-deep-brown opacity-100 md:opacity-0 md:group-hover/section:opacity-100 transition-all duration-300 pointer-events-auto hover:scale-110 hover:bg-deep-brown hover:text-white hover:shadow-xl"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Scroll Container */}
              <div
                ref={scrollRef}
                className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4 px-1"
                style={{ scrollBehavior: 'smooth' }}
              >
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="min-w-[45%] md:min-w-[23%] flex-shrink-0 snap-start"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>

              {/* Scroll Button Right */}
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-12 h-12 bg-white/95 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center text-deep-brown opacity-100 md:opacity-0 md:group-hover/section:opacity-100 transition-all duration-300 pointer-events-auto hover:scale-110 hover:bg-deep-brown hover:text-white hover:shadow-xl"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>

            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full text-center py-20 bg-deep-brown/5 rounded-xl border border-deep-brown/10 border-dashed"
            >
              <p className="text-deep-brown/60 text-lg">{t('noProducts')}</p>
            </motion.div>
          )}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <Link href={`/catalog?category=${category}`}>
            <button className="group px-8 py-4 bg-deep-brown text-white font-semibold rounded-full hover:bg-warm-sand transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 flex items-center gap-3">
              <span>{t('viewAllProducts')}</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function ProductRange() {
  const t = useTranslations('products');

  return (
    <div className="bg-[#FDFBF7] py-16 md:py-24">
      <CategorySection category="men" title={t('men.title')} index={0} t={t} />
      <CategorySection category="women" title={t('women.title')} index={1} t={t} />
      <CategorySection category="kids" title={t('kids.title')} index={2} t={t} />
    </div>
  );
}
