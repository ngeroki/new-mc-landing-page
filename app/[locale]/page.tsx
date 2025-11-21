import Hero from '../sections/Hero';
import BrandCredibility from '../sections/BrandCredibility';
import CompanyStory from '../sections/CompanyStory';
import ProductRange from '../sections/ProductRange';
import Testimonials from '../sections/Testimonials';
import CTA from '../sections/CTA';
import Footer from '../sections/Footer';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <BrandCredibility />
      <CompanyStory />
      <ProductRange />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}

