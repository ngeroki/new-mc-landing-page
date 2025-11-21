'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const newLocale = locale === 'id' ? 'en' : 'id';
    // Handle both /locale and /locale/ paths
    const currentPath = pathname.replace(/^\/(id|en)\/?/, '');
    const newPath = `/${newLocale}/${currentPath || ''}`;
    
    startTransition(() => {
      window.location.href = newPath;
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className="px-3 py-1.5 text-sm font-medium text-deep-brown hover:text-warm-sand transition-colors duration-200 uppercase tracking-wide"
      aria-label="Switch language"
    >
      {locale === 'id' ? 'EN' : 'ID'}
    </button>
  );
}

