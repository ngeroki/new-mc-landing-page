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
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-[15px] font-bold text-deep-brown hover:text-muted-brown transition-colors duration-200"
              >
                {t(link.key)}
              </Link>
            ))}
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

          {/* Right: Actions (Language Switcher for now) */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
            {/* Placeholder for Search/Account/Cart icons if needed later */}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4 absolute right-6">
            <LanguageSwitcher />
            <MobileMenu navLinks={navLinks} t={t} locale={locale} />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({ navLinks, t, locale }: { navLinks: any[], t: any, locale: string }) {
  const [isOpen, setIsOpen] = useState(false);

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
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-[15px] font-bold text-deep-brown hover:text-muted-brown transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
