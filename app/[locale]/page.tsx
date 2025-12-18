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
    ? 'New MC - Pusat Grosir Sandal Tangan Pertama Indonesia'
    : 'New MC - First-hand Wholesale Sandals Supplier Indonesia';

  const description = locale === 'id'
    ? 'Distributor grosir sandal tangan pertama dengan harga terbaik. Menyediakan berbagai model sandal pria, wanita, dan anak dengan kualitas premium dan MOQ rendah.'
    : 'First-hand wholesale sandals distributor at the best prices. Providing various models of men, women, and kids sandals with premium quality and low MOQ.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ['/images/company-story.jpg'],
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
    image: 'https://new-mc-website.vercel.app/images/company-story.jpg',
    '@id': 'https://new-mc-website.vercel.app',
    url: 'https://new-mc-website.vercel.app',
    telephone: '+6281234567890', // Placeholder, verify with user
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pusat Grosir Sandal',
      addressLocality: 'Jakarta',
      addressRegion: 'DKI Jakarta',
      postalCode: '10000',
      addressCountry: 'ID'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.1751,
      longitude: 106.8650
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
