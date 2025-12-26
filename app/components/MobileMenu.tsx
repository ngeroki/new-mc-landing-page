'use client';

import { useState, useEffect } from 'react';
import { Link, usePathname } from '@/routing';

interface MobileMenuProps {
    navLinks: { href: string; label: string }[];
    t: (key: string) => string;
    locale: string;
}

export default function MobileMenu({ navLinks, t, locale }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const isActive = (path: string) => {
        if (path === '/') return pathname === `/${locale}`;
        return pathname?.startsWith(`/${locale}${path}`);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 -ml-2 text-deep-brown hover:opacity-70 transition-opacity focus:outline-none"
                aria-label="Open menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Slide-out Menu */}
            <div
                className={`fixed top-0 left-0 bottom-0 w-[300px] bg-[#FDFBF7] z-[70] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="h-[100px] flex items-center justify-between px-6 border-b border-deep-brown/10">
                    <span className="text-lg font-serif font-bold tracking-widest text-deep-brown">MENU</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 -mr-2 text-deep-brown/60 hover:text-deep-brown transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Links */}
                <nav className="flex-1 overflow-y-auto py-8 px-6 space-y-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`block text-xl font-serif tracking-wide ${isActive(link.href)
                                ? 'text-deep-brown font-medium'
                                : 'text-deep-brown/70 hover:text-deep-brown'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="pt-6 mt-6 border-t border-deep-brown/10">
                        <div className="text-xs text-deep-brown/40 font-bold uppercase tracking-[0.2em] mb-4">{t('categories')}</div>
                        <div className="space-y-4 pl-4 border-l border-deep-brown/10">
                            <Link href="/catalog?category=men" className="block text-lg text-deep-brown/80 hover:text-deep-brown font-serif">{t('menSandals')}</Link>
                            <Link href="/catalog?category=women" className="block text-lg text-deep-brown/80 hover:text-deep-brown font-serif">{t('womenSandals')}</Link>
                            <Link href="/catalog?category=kids" className="block text-lg text-deep-brown/80 hover:text-deep-brown font-serif">{t('kidsSandals')}</Link>
                        </div>
                    </div>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-deep-brown/10 bg-deep-brown/5">
                    <Link href="/" className="block">
                        <img src="/images/new-mc-logo-v5.png" alt="New MC Logo" className="h-10 w-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                    </Link>
                </div>
            </div>
        </>
    );
}
