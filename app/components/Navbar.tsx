'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return pathname === `/${locale}`;
    return pathname?.startsWith(`/${locale}${path}`);
  };

  const getLinkClasses = (path: string) => {
    const active = isActive(path);
    return `group relative text-[15px] font-bold tracking-[0.6px] transition-colors duration-300 ${active ? 'text-deep-brown' : 'text-deep-brown/75 hover:text-deep-brown'
      }`;
  };

  const navLinks = [
    { href: '/about', label: t('about') },
    { href: '/catalog', label: t('catalog') },
    { href: '/contact', label: t('contact') },
  ];

  const AnimatedUnderline = ({ isActive }: { isActive: boolean }) => (
    <span
      className={`absolute -bottom-1 left-1/2 h-[1.5px] bg-deep-brown transition-all duration-300 -translate-x-1/2 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
    />
  );

  // Search Icon Component for reusability
  const SearchIcon = ({ className = "" }: { className?: string }) => (
    <Link
      href={`/${locale}/catalog`}
      className={`text-deep-brown/75 hover:text-deep-brown transition-all duration-300 p-1 hover:scale-110 ${className}`}
      aria-label="Search"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </Link>
  );

  // Chevron Icon for dropdown
  const ChevronIcon = () => (
    <svg
      className="w-3 h-3 ml-1 transition-transform duration-300 group-hover/dropdown:rotate-180"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <nav
      className={`relative w-full bg-[#F5E6CC] transition-all duration-300 z-50 ${isScrolled ? 'shadow-md' : 'border-b border-deep-brown/5'
        }`}
    >
      {/* Desktop Navbar */}
      <div className="hidden md:block w-full px-6 md:px-12 mx-auto">
        <div className="h-[100px] grid grid-cols-[1fr_auto_1fr] items-center gap-4">

          {/* Left: Navigation Links */}
          <div className="flex items-center justify-start">
            <div className="flex items-center gap-8 lg:gap-12 pl-2">
              <Link href={`/${locale}/about`} className={getLinkClasses('/about')}>
                {t('about')}
                <AnimatedUnderline isActive={isActive('/about')} />
              </Link>

              {/* Catalog Dropdown */}
              <div className="relative group/dropdown h-[100px] flex items-center">
                <Link
                  href={`/${locale}/catalog`}
                  className={`${getLinkClasses('/catalog')} flex items-center group-hover/dropdown:text-deep-brown`}
                >
                  {t('catalog')}
                  <ChevronIcon />
                  <AnimatedUnderline isActive={isActive('/catalog')} />
                </Link>

                {/* Dropdown Menu */}
                <div className="absolute top-[100px] left-0 w-64 bg-[#FDFBF7] shadow-lg border-t border-deep-brown/10 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 transform translate-y-2 group-hover/dropdown:translate-y-0 text-left">
                  <div className="py-2">
                    <Link
                      href={`/${locale}/catalog`}
                      className="block px-6 py-3 text-[13px] font-bold tracking-widest text-deep-brown hover:bg-black/5 transition-colors uppercase border-b border-deep-brown/5"
                    >
                      {t('allProducts')}
                    </Link>

                    <div className="pt-3 pb-1 px-6 text-[10px] text-deep-brown/40 font-bold uppercase tracking-[0.2em]">{t('categories')}</div>
                    <Link href={`/${locale}/catalog?category=men`} className="block px-6 py-2 text-[14px] text-deep-brown/80 hover:text-deep-brown hover:bg-black/5 transition-colors">{t('menSandals')}</Link>
                    <Link href={`/${locale}/catalog?category=women`} className="block px-6 py-2 text-[14px] text-deep-brown/80 hover:text-deep-brown hover:bg-black/5 transition-colors">{t('womenSandals')}</Link>
                    <Link href={`/${locale}/catalog?category=kids`} className="block px-6 py-2 text-[14px] text-deep-brown/80 hover:text-deep-brown hover:bg-black/5 transition-colors">{t('kidsSandals')}</Link>

                    <div className="pt-3 pb-1 px-6 text-[10px] text-deep-brown/40 font-bold uppercase tracking-[0.2em] border-t border-deep-brown/5 mt-2">{t('specialCollections')}</div>
                    <Link href={`/${locale}/catalog?filter=new`} className="block px-6 py-2 text-[14px] text-deep-brown/80 hover:text-deep-brown hover:bg-black/5 transition-colors">{t('newArrivals')}</Link>
                    <Link href={`/${locale}/catalog?filter=bestseller`} className="block px-6 py-2 text-[14px] text-deep-brown/80 hover:text-deep-brown hover:bg-black/5 transition-colors">{t('bestSellers')}</Link>
                  </div>
                </div>
              </div>

              <Link href={`/${locale}/contact`} className={getLinkClasses('/contact')}>
                {t('contact')}
                <AnimatedUnderline isActive={isActive('/contact')} />
              </Link>
            </div>
          </div>

          {/* Center: Logo - Now navigates to current locale home */}
          <div className="flex justify-center items-center h-full py-2">
            <Link href={`/${locale}`} className="relative block h-[80px] w-auto transition-all duration-300 hover:opacity-90 hover:scale-[1.02]">
              <img
                src="/images/new-mc-logo-v5.png"
                alt="New MC Logo"
                className="h-full w-auto object-contain"
              />
            </Link>
          </div>

          {/* Right: Language Switcher & Search */}
          <div className="flex items-center justify-end pr-2 gap-6">
            <LanguageSwitcher />
            <SearchIcon />
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden w-full px-4 mx-auto">
        <div className="h-20 flex items-center justify-between relative">
          {/* Left: Menu Button */}
          <div className="flex items-center z-10">
            <MobileMenu navLinks={navLinks} t={t} locale={locale} />
          </div>

          {/* Center: Logo - Now navigates to current locale home */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href={`/${locale}`} className="block h-14 w-auto">
              <img
                src="/images/new-mc-logo-v5.png"
                alt="New MC Logo"
                className="h-full w-auto object-contain"
              />
            </Link>
          </div>

          {/* Right: Search & Language Switcher */}
          <div className="flex items-center gap-2 z-10">
            <SearchIcon className="scale-90" />
            <div className="scale-90 origin-right">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
