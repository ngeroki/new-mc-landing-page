import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/routing';
import '../globals.css';
import Navbar from '../components/Navbar';
import Footer from '../sections/Footer';

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
      <body>
        <NextIntlClientProvider messages={messages} locale={validLocale}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
