'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import WhatsAppButton from '../components/WhatsAppButton';
import { Link } from '@/routing';
import { useLocale } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-semibold text-deep-brown mb-6 leading-tight">
              {t('headline')}
            </h1>
            <p className="text-lg md:text-xl text-deep-brown/80 mb-8 max-w-2xl mx-auto md:mx-0">
              {t('subheadline')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <WhatsAppButton />
              <Link
                href={`/${locale}/#catalog`}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-md bg-deep-brown text-white hover:bg-[#3A2819] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('catalog')}
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/hero-sandals.jpg"
              alt="New MC Sandals"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

