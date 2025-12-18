import ProductDetailClient from './ProductDetailClient';
import { products } from '@/app/data/products';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ productId: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { productId, locale } = await params;
    const decodedId = decodeURIComponent(productId);
    const product = products.find(p => p.id === decodedId);

    if (!product) {
        return {
            title: 'Product Not Found | New MC',
        };
    }

    const title = locale === 'id'
        ? `Grosir ${product.name} - Supplier Sandal New MC`
        : `Wholesale ${product.name} - New MC Sandals Supplier`;

    const description = locale === 'id'
        ? `Beli grosir ${product.name} dengan harga terbaik. MOQ ${product.moq} pcs, variasi ukuran ${product.sizeRun}. Hubungi kami untuk pemesanan toko.`
        : `Purchase wholesale ${product.name} at best prices. MOQ ${product.moq} pcs, size run ${product.sizeRun}. Contact us for bulk orders.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [product.image],
        },
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const { productId } = await params;
    return <ProductDetailClient productId={productId} />;
}
