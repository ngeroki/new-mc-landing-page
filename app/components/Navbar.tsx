'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link } from '@/routing';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
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

  const isActive = (path: string) => {
    // Check if current path matches the link path (handling locale prefix possibility)
    if (path === '/') return pathname === `/${locale}` || pathname === '/';
    return pathname.includes(path);
  };

  const getLinkClasses = (path: string) => {
    const active = isActive(path);
    return `text-[15px] font-bold transition-all duration-200 relative ${active ? 'text-warm-sand' : 'text-deep-brown hover:text-muted-brown'
      }`;
  };

  return (
    <nav
      className={`w-full bg-[#F5E6CC] transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'
        }`}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-32">

          {/* Left: Navigation Links */}
          <div className="hidden md:flex items-center space-x-10 flex-1 justify-start"> {/* Increased space-x */}
            <Link
              href="/about"
              className={getLinkClasses('/about').replace('text-[15px]', 'text-lg tracking-wide')} // Increased text size
            >
              {t('about')}
              {isActive('/about') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-warm-sand rounded-full" />
              )}
            </Link>

            {/* Catalog Dropdown */}
            <div className="relative group">
              <Link
                href="/catalog"
                className={`${getLinkClasses('/catalog').replace('text-[15px]', 'text-lg tracking-wide')} flex items-center gap-1`}
              >
                {t('catalog')}
                <svg className="w-5 h-5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* Larger icon */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {isActive('/catalog') && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-warm-sand rounded-full" />
                )}
              </Link>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-deep-brown/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-3">
                  <Link
                    href="/catalog"
                    className="block px-6 py-3 text-base text-deep-brown hover:bg-[#FDFBF7] transition-colors font-semibold border-b border-deep-brown/10"
                  >
                    📦 {t('allProducts')}
                  </Link>
                  <div className="px-6 py-2 text-xs text-deep-brown/50 font-semibold uppercase tracking-wider mt-1">{t('categories')}</div>
                  <Link
                    href="/catalog?category=men"
                    className="block px-6 py-2 text-base text-deep-brown hover:bg-[#FDFBF7] transition-colors"
                  >
                    👞 {t('menSandals')}
                  </Link>
                  <Link
                    href="/catalog?category=women"
                    className="block px-6 py-2 text-base text-deep-brown hover:bg-[#FDFBF7] transition-colors"
                  >
                    👠 {t('womenSandals')}
                  </Link>
                  <Link
                    href="/catalog?category=kids"
                    className="block px-6 py-2 text-base text-deep-brown hover:bg-[#FDFBF7] transition-colors"
                  >
                    👟 {t('kidsSandals')}
                  </Link>
                  <div className="px-6 py-2 text-xs text-deep-brown/50 font-semibold uppercase tracking-wider border-t border-deep-brown/10 mt-2 pt-2">{t('specialCollections')}</div>
                  <Link
                    href="/catalog?filter=new"
                    className="block px-6 py-2 text-base text-deep-brown hover:bg-[#FDFBF7] transition-colors"
                  >
                    ✨ {t('newArrivals')}
                  </Link>
                  <Link
                    href="/catalog?filter=bestseller"
                    className="block px-6 py-2 text-base text-deep-brown hover:bg-[#FDFBF7] transition-colors"
                  >
                    🔥 {t('bestSellers')}
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className={getLinkClasses('/contact').replace('text-[15px]', 'text-lg tracking-wide')}
            >
              {t('contact')}
              {isActive('/contact') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-warm-sand rounded-full" />
              )}
            </Link>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center justify-center">
              <div className="relative h-28 w-auto transform hover:scale-105 transition-transform duration-300"> {/* Increased Height */}
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

          {/* Mobile: Centered Logo with Menu Left, Language Right */}
          <div className="md:hidden flex items-center justify-between w-full relative">
            {/* Left: Menu Button */}
            <div className="flex items-center justify-start z-20">
              <MobileMenu navLinks={navLinks} t={t} locale={locale} />
            </div>

            {/* Center: Logo (Absolutely Positioned) */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <Link href="/" className="flex items-center pointer-events-auto">
                <div className="relative h-20 w-auto">
                  <img
                    src="/images/new-mc-logo-v5.png"
                    alt="New MC Logo"
                    className="h-full w-auto object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Right: Language Switcher */}
            <div className="flex items-center justify-end z-20">
              <LanguageSwitcher />
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
        className="p-2 text-deep-brown hover:text-muted-brown relative z-[60]"
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

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#F5E6CC] shadow-2xl z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="px-6 py-8 space-y-6 mt-16">
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block text-lg font-bold text-deep-brown hover:text-warm-sand transition-colors py-2"
          >
            {t('about')}
          </Link>

          {/* Catalog Section */}
          <div>
            <button
              onClick={() => setCatalogOpen(!catalogOpen)}
              className="w-full flex items-center justify-between text-lg font-bold text-deep-brown hover:text-warm-sand transition-colors py-2"
            >
              {t('catalog')}
              <svg className={`w-5 h-5 transition-transform duration-300 ${catalogOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${catalogOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="mt-3 ml-4 space-y-3">
                <Link
                  href="/catalog"
                  onClick={() => setIsOpen(false)}
                  className="block text-base text-deep-brown hover:text-warm-sand transition-colors py-1"
                >
                  📦 {t('allProducts')}
                </Link>
                <div className="text-xs text-deep-brown/50 font-semibold uppercase tracking-wider mt-2">{t('categories')}</div>
                <Link
                  href="/catalog?category=men"
                  onClick={() => setIsOpen(false)}
                  className="block text-base text-deep-brown hover:text-warm-sand transition-colors py-1"
                >
                  👞 {t('menSandals')}
                </Link>
                <Link
                  href="/catalog?category=women"
                  onClick={() => setIsOpen(false)}
                  className="block text-base text-deep-brown hover:text-warm-sand transition-colors py-1"
                >
                  👠 {t('womenSandals')}
                </Link>
                <Link
                  href="/catalog?category=kids"
                  onClick={() => setIsOpen(false)}
                  className="block text-base text-deep-brown hover:text-warm-sand transition-colors py-1"
                >
                  👟 {t('kidsSandals')}
                </Link>
                <div className="text-xs text-deep-brown/50 font-semibold uppercase tracking-wider border-t border-deep-brown/10 mt-2 pt-2">{t('specialCollections')}</div>
                <Link
                  href="/catalog?filter=new"
                  onClick={() => setIsOpen(false)}
                  className="block text-base text-deep-brown hover:text-warm-sand transition-colors py-1"
                >
                  ✨ {t('newArrivals')}
                </Link>
                <Link
                  href="/catalog?filter=bestseller"
                  onClick={() => setIsOpen(false)}
                  className="block text-base text-deep-brown hover:text-warm-sand transition-colors py-1"
                >
                  🔥 {t('bestSellers')}
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-lg font-bold text-deep-brown hover:text-warm-sand transition-colors py-2"
          >
            {t('contact')}
          </Link>
        </div>
      </div>
    </>
  );
}
