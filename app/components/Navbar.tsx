'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link } from '@/routing';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'about', href: '/about' },
    { key: 'catalog', href: '/catalog' },
    { key: 'contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7] transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'
        }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-24">

          {/* Left: Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-start">
            <Link
              href="/about"
              className="text-[15px] font-bold text-deep-brown hover:text-muted-brown transition-colors duration-200"
            >
              {t('about')}
            </Link>

            {/* Catalog Dropdown */}
            <div className="relative group">
              <Link
                href="/catalog"
                className="text-[15px] font-bold text-deep-brown hover:text-muted-brown transition-colors duration-200 flex items-center gap-1"
              >
                {t('catalog')}
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-deep-brown/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link
                    href="/catalog"
                    className="block px-4 py-2 text-sm text-deep-brown hover:bg-[#FDFBF7] transition-colors font-semibold border-b border-deep-brown/10"
                  >
                    📦 Semua Produk
                  </Link>
                  <div className="px-4 py-2 text-xs text-deep-brown/50 font-semibold">Kategori</div>
                  <Link
                    href="/catalog?category=men"
                    className="block px-4 py-2 text-sm text-deep-brown hover:bg-[#FDFBF7] transition-colors"
                  >
                    👞 Sandal Pria
                  </Link>
                  <Link
                    href="/catalog?category=women"
                    className="block px-4 py-2 text-sm text-deep-brown hover:bg-[#FDFBF7] transition-colors"
                  >
                    👠 Sandal Wanita
                  </Link>
                  <Link
                    href="/catalog?category=kids"
                    className="block px-4 py-2 text-sm text-deep-brown hover:bg-[#FDFBF7] transition-colors"
                  >
                    👟 Sandal Anak
                  </Link>
                  <div className="px-4 py-2 text-xs text-deep-brown/50 font-semibold border-t border-deep-brown/10 mt-1">Koleksi Spesial</div>
                  <Link
                    href="/new-arrivals"
                    className="block px-4 py-2 text-sm text-deep-brown hover:bg-[#FDFBF7] transition-colors"
                  >
                    ✨ Produk Baru
                  </Link>
                  <Link
                    href="/best-sellers"
                    className="block px-4 py-2 text-sm text-deep-brown hover:bg-[#FDFBF7] transition-colors"
                  >
                    🔥 Terlaris
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="text-[15px] font-bold text-deep-brown hover:text-muted-brown transition-colors duration-200"
            >
              {t('contact')}
            </Link>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-20 w-auto">
                <img
                  src="/images/new-mc-logo-v5.png"
                  alt="New MC Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Right: Actions (Language Switcher) */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
            <LanguageSwitcher />
          </div>

          {/* Mobile: Logo on Left, Language + Menu on Right */}
          <div className="md:hidden flex items-center justify-between w-full">
            <Link href="/" className="flex items-center">
              <div className="relative h-16 w-auto">
                <img
                  src="/images/new-mc-logo-v5.png"
                  alt="New MC Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
            <div className="flex items-center space-x-3">
              <LanguageSwitcher />
              <MobileMenu navLinks={navLinks} t={t} locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({ navLinks, t, locale }: { navLinks: any[], t: any, locale: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-deep-brown hover:text-muted-brown"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-24 left-0 right-0 bg-[#FDFBF7] shadow-lg border-t border-deep-brown/10">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block text-[15px] font-bold text-deep-brown hover:text-muted-brown transition-colors"
            >
              {t('about')}
            </Link>

            {/* Catalog Section */}
            <div>
              <button
                onClick={() => setCatalogOpen(!catalogOpen)}
                className="w-full flex items-center justify-between text-[15px] font-bold text-deep-brown hover:text-muted-brown transition-colors"
              >
                {t('catalog')}
                <svg className={`w-4 h-4 transition-transform ${catalogOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {catalogOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  <Link
                    href="/catalog"
                    onClick={() => setIsOpen(false)}
                    className="block text-sm text-deep-brown hover:text-muted-brown transition-colors"
                  >
                    📦 All Products
                  </Link>
                  <Link
                    href="/new-arrivals"
                    onClick={() => setIsOpen(false)}
                    className="block text-sm text-deep-brown hover:text-muted-brown transition-colors"
                  >
                    ✨ New Arrivals
                  </Link>
                  <Link
                    href="/best-sellers"
                    onClick={() => setIsOpen(false)}
                    className="block text-sm text-deep-brown hover:text-muted-brown transition-colors"
                  >
                    🔥 Best Sellers
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block text-[15px] font-bold text-deep-brown hover:text-muted-brown transition-colors"
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
