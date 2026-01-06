import ContactClient from './ContactClient';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const title = locale === 'id'
        ? 'Hubungi New MC - Grosir Sandal Bogor | Supplier Tangan Pertama'
        : 'Contact New MC - Bogor Wholesale Sandals | First-hand Supplier';

    const description = locale === 'id'
        ? 'Hubungi kami untuk informasi pemesanan grosir sandal tangan pertama. Siap melayani pengiriman ke seluruh Indonesia dari pusat grosir kami di Bogor.'
        : 'Contact us for first-hand wholesale sandal order information. Ready to serve shipping throughout Indonesia from our wholesale center in Bogor.';

    return {
        title,
        description,
        alternates: {
            canonical: `https://newmc.id/${locale}/contact/`,
        },
        openGraph: {
            title,
            description,
            url: `https://newmc.id/${locale}/contact/`,
            images: ['/images/company-story.jpg'],
        },
    };
}

export default async function Page() {
    return <ContactClient />;
}
