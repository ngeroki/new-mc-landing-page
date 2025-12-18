import CatalogClient from './CatalogClient';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const title = locale === 'id'
        ? 'Katalog Grosir Sandal Terbaru - New MC'
        : 'Latest Wholesale Sandals Catalog - New MC';

    const description = locale === 'id'
        ? 'Jelajahi koleksi lengkap grosir sandal terbaru dari New MC. Berbagai model sandal pria, wanita, dan anak dengan harga supplier tangan pertama.'
        : 'Explore the complete collection of latest wholesale sandals from New MC. Various models of men, women, and kids sandals with first-hand supplier prices.';

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

export default async function Page() {
    return <CatalogClient />;
}
