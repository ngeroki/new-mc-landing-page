import AboutClient from './AboutClient';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const title = locale === 'id'
        ? 'Tentang New MC - Supplier Grosir Sandal Berpengalaman Sejak 2004'
        : 'About New MC - Experienced Wholesale Sandals Supplier Since 2004';

    const description = locale === 'id'
        ? 'Pelajari lebih lanjut tentang perjalanan New MC sebagai mitra terpercaya toko sandal di seluruh Indonesia. Dedikasi untuk kualitas dan kepercayaan sejak 2004.'
        : 'Learn more about New MC journey as a trusted partner for sandal stores across Indonesia. Dedicated to quality and trust since 2004.';

    return {
        title,
        description,
        alternates: {
            canonical: `https://newmc.id/${locale}/about/`,
        },
        openGraph: {
            title,
            description,
            url: `https://newmc.id/${locale}/about/`,
            images: ['/images/company-story.jpg'],
        },
    };
}

export default async function Page() {
    return <AboutClient />;
}
