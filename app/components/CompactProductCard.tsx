'use client';

import { Link } from '@/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Product } from '@/app/data/products';

interface CompactProductCardProps {
    product: Product;
}

export default function CompactProductCard({ product }: CompactProductCardProps) {
    const t = useTranslations('catalog');

    return (
        <Link
            href={`/catalog/${product.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group block"
        >
            {/* Product Image */}
            <div className="relative aspect-square bg-[#FDFBF7] overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges - Smaller */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    {product.isBestseller && (
                        <span className="px-2 py-0.5 bg-warm-sand text-white text-[10px] font-semibold rounded-full shadow-sm">
                            {t('bestseller')}
                        </span>
                    )}
                    {product.isNew && (
                        <span className="px-2 py-0.5 bg-deep-brown text-white text-[10px] font-semibold rounded-full shadow-sm">
                            {t('new')}
                        </span>
                    )}
                </div>
            </div>

            {/* Product Info - Compact & Centered */}
            <div className="p-3 space-y-2 text-center">
                {/* Product Name - Larger */}
                <h3 className="text-base md:text-lg font-heading font-semibold text-deep-brown group-hover:text-warm-sand transition-colors duration-300 line-clamp-2">
                    {product.name}
                </h3>

                {/* Price Only */}
                <div className="flex flex-nowrap items-baseline justify-center gap-1">
                    <span className="text-lg font-bold text-deep-brown whitespace-nowrap">
                        Rp{product.wholesalePrice.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs text-deep-brown/60 whitespace-nowrap">/ pcs</span>
                </div>
            </div>
        </Link>
    );
}
