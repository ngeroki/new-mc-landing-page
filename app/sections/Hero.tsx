'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppButton from '../components/WhatsAppButton';
import { Link } from '@/routing';
import { useLocale } from 'next-intl';
import { useState, useEffect } from 'react';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const [currentImage, setCurrentImage] = useState(0);

  // Different bestseller images from ProductRange section
  const bestsellerImages = [
    '/mcpolo-terlaris/Leytisa/Leytisa-Lifestyle-01.png',
    '/mcpolo-terlaris/ALZA/ALZA-Lifestyle-01.png',
    '/mcpolo-terlaris/ADV-01/ADV-01-Lifestyle-01.png',
    '/mcpolo-terlaris/Ulir-45/Ulir-45-Lifestyle-01.png',
  ];

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bestsellerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bestsellerImages.length]);

  return (
    <>
      {/* Desktop: Split Layout */}
      <section className="hidden md:block relative w-full bg-soft-beige">
        <div className="w-full px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center py-12 lg:py-20">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-medium text-deep-brown leading-tight tracking-tight">
                {t('headline')}
              </h1>

              <p className="text-lg md:text-xl text-deep-brown/80 leading-relaxed max-w-xl">
                {t('subheadline')}
              </p>

              <div className="flex flex-row gap-4 pt-4">
                <Link
                  href="/catalog"
                  className="inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-medium rounded bg-deep-brown text-white hover:bg-deep-brown/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  {t('catalog')}
                </Link>
                <WhatsAppButton
                  variant="outline"
                />
              </div>
            </motion.div>

            {/* Image Slider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={bestsellerImages[currentImage]}
                    alt="Hero Collection"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Slide Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {bestsellerImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`h-1 rounded-full transition-all duration-500 ${index === currentImage ? 'bg-white w-8' : 'bg-white/50 w-2'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile: Overlay Layout */}
      <section className="md:hidden relative w-full h-[80vh] overflow-hidden bg-deep-brown">
        {/* Background Image Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={bestsellerImages[currentImage]}
                alt="Hero Collection"
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        </div>

        {/* Hero Content - Bottom Aligned */}
        <div className="relative z-20 w-full h-full flex flex-col justify-end items-center text-center pb-20 px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-3xl font-heading font-medium text-white mb-4 leading-tight tracking-tight drop-shadow-lg">
                {t('headline')}
              </h1>

              <p className="text-xs md:text-sm text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed drop-shadow-md px-4">
                {t('subheadline')}
              </p>

              <div className="flex flex-row gap-3 justify-center items-center pt-4">
                <Link
                  href="/catalog"
                  className="px-8 py-3 text-base font-medium rounded-full bg-white text-deep-brown hover:bg-[#F0F0F0] transition-all duration-300 shadow-xl hover:scale-105"
                >
                  {t('catalog')}
                </Link>
                <WhatsAppButton
                  variant="outline"
                  className="!border-white !text-white hover:!bg-white hover:!text-deep-brown rounded-full"
                />
              </div>
            </motion.div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {bestsellerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-1 rounded-full transition-all duration-500 ${index === currentImage ? 'bg-white w-8' : 'bg-white/40 w-2'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
