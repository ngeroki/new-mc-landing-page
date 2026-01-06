import Hero from '../sections/Hero';
import BrandCredibility from '../sections/BrandCredibility';
import CompanyStory from '../sections/CompanyStory';
import ProductRange from '../sections/ProductRange';
import Testimonials from '../sections/Testimonials';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'id'
    ? 'New MC - Pusat Grosir Sandal Tangan Pertama Indonesia | Supplier Sandal Bogor'
    : 'New MC - First-hand Wholesale Sandals Supplier Indonesia | Bogor Sandal Supplier';

  const description = locale === 'id'
    ? 'Supplier grosir sandal tangan pertama di Bogor dengan harga terbaik. Menyediakan berbagai model sandal pria, wanita, dan anak untuk toko Anda. Siap kirim seluruh Indonesia.'
    : 'First-hand wholesale sandals supplier in Bogor at the best prices. Providing various men, women, and kids sandal models for your store. Nationwide shipping available.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://newmc.id/${locale}/`,
      languages: {
        'id-ID': 'https://newmc.id/id/',
        'en-US': 'https://newmc.id/en/',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://newmc.id/${locale}/`,
      siteName: 'New MC Sandal',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/company-story.jpg',
          width: 1200,
          height: 630,
          alt: 'New MC Sandal Wholesale',
        },
      ],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  // LocalBusiness Schema for AI & SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'New MC Sandal',
    image: 'https://newmc.id/images/company-story.jpg',
    '@id': 'https://newmc.id',
    url: 'https://newmc.id',
    telephone: '+6281234567890',
    priceRange: 'Rp',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Blok B. Lt. Dasar. No. 60-62, P.S Kebon Kembang',
      addressLocality: 'Bogor',
      addressRegion: 'Jawa Barat',
      postalCode: '16124',
      addressCountry: 'ID'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.5971,
      longitude: 106.7949
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      opens: '08:00',
      closes: '17:00'
    },
    sameAs: [
      'https://www.instagram.com/newmcsandal'
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <BrandCredibility />
      <CompanyStory />
      <ProductRange />
      <Testimonials />
    </>
  );
}
