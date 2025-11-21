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
    { key: 'home', href: `/${locale}/` },
    { key: 'about', href: `/${locale}/#about` },
    { key: 'catalog', href: `/${locale}/#catalog` },
    { key: 'advantages', href: `/${locale}/#advantages` },
    { key: 'contact', href: `/${locale}/#contact` },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}/`} className="text-2xl md:text-3xl font-heading font-bold text-deep-brown hover:text-warm-sand transition-colors">
            New MC
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-base font-medium text-deep-brown hover:text-warm-sand transition-colors duration-200"
              >
                {t(link.key)}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
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
        className="p-2 text-deep-brown"
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
        <div className="absolute top-20 left-0 right-0 bg-white shadow-lg border-t">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-deep-brown hover:text-warm-sand transition-colors"
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

