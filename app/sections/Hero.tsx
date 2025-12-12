'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppButton from '../components/WhatsAppButton';
import { Link } from '@/routing';
import { useLocale } from 'next-intl';
import { useState } from 'react';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const [currentImage, setCurrentImage] = useState(0);

  // Different bestseller images from ProductRange section
  const bestsellerImages = [
    '/mcpolo-terlaris/Leytisa/Leytisa-Lifestyle-01.png',
    '/mcpolo-terlaris/ALZA/ALZA-Lifestyle-01.png',
    '/mcpolo-terlaris/ADV 01/ADV 01-Lifestyle-01.png',
    '/mcpolo-terlaris/Ulir 45/Ulir 45-Lifestyle-01.png',
  ];

  const handleHover = () => {
    setCurrentImage((prev) => (prev + 1) % bestsellerImages.length);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center md:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-semibold text-deep-brown mb-4 md:mb-6 leading-tight">
              {t('headline')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-deep-brown/80 mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0">
              {t('subheadline')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <WhatsAppButton />
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-md bg-deep-brown text-white hover:bg-[#3A2819] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('catalog')}
              </Link>
            </div>
          </motion.div>

          {/* Hero Image - Dynamic Slide Animation on Hover */}
          <div
            className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl cursor-pointer"
            onMouseEnter={handleHover}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ x: 300, scale: 1.2, opacity: 0 }}
                animate={{ x: 0, scale: 1, opacity: 1 }}
                exit={{ x: -300, scale: 0.8, opacity: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
                className="absolute inset-0"
              >
                <Image
                  src={bestsellerImages[currentImage]}
                  alt="Bestseller Sandals"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Image Indicators */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-10">
              {bestsellerImages.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentImage ? 'bg-white w-8' : 'bg-white/50 w-2'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
