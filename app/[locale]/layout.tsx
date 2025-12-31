import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/routing';

export const runtime = 'edge';

import { Bodoni_Moda, Inter } from 'next/font/google';
import '../globals.css';
import Navbar from '../components/Navbar';
import Footer from '../sections/Footer';
import BackToTop from '../components/BackToTop';

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--heading-font',
  display: 'swap',
  adjustFontFallback: false,
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--body-font',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function getMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    return (await import(`@/messages/${routing.defaultLocale}.json`)).default;
  }
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = routing.locales.includes(locale as any) ? locale : routing.defaultLocale;
  const messages = await getMessages(validLocale);

  return (
    <html lang={validLocale} suppressHydrationWarning>
      <body className={`min-h-screen ${bodoniModa.variable} ${inter.variable} font-body antialiased`}>
        <NextIntlClientProvider messages={messages} locale={validLocale}>
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
            <Navbar />
          </div>
          <main className="pt-20 md:pt-[100px]">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
