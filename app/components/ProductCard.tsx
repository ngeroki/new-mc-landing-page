'use client';

import { Link } from '@/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Product } from '@/app/data/products';

interface ProductCardProps {
    product: Product;
    priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
    const t = useTranslations('catalog');

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col">
            {/* Product Image */}
            <Link href={`/catalog/${product.id}`} className="relative block aspect-square bg-[#FDFBF7] overflow-hidden">
                <div className="w-full h-full relative">
                    {/* Main Image */}
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={`object-contain p-4 group-hover:opacity-0 transition-all duration-500 z-10`}
                        priority={priority}
                    />

                    {/* Lifestyle/Hover Image */}
                    <Image
                        src={product.lifestyleImage || product.image}
                        alt={`${product.name} lifestyle`}
                        fill
                        className={`object-contain p-4 absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 z-20 ${!product.lifestyleImage ? 'scale-110' : 'object-cover'}`}
                    />
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-30 pointer-events-none">
                    {product.isBestseller && (
                        <span className="px-3 py-1 bg-warm-sand text-white text-xs font-semibold rounded-full shadow-sm">
                            {t('bestseller')}
                        </span>
                    )}
                    {product.isNew && (
                        <span className="px-3 py-1 bg-deep-brown text-white text-xs font-semibold rounded-full shadow-sm">
                            {t('new')}
                        </span>
                    )}
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-6 space-y-4 flex flex-col flex-grow">
                {/* Product Name */}
                <Link href={`/catalog/${product.id}`} className="block">
                    <h3 className="text-xl font-heading font-semibold text-deep-brown group-hover:text-warm-sand transition-colors duration-300">
                        {product.name}
                    </h3>
                </Link>

                {/* Wholesale Metadata */}
                <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FEF1DE] text-deep-brown text-xs font-medium rounded-full">
                        <span>📦</span> MOQ {product.moq} pcs
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FEF1DE] text-deep-brown text-xs font-medium rounded-full">
                        <span>📏</span> {t('size')} {product.sizeRun}
                    </span>
                </div>

                {/* Package Info */}
                <div className="text-xs text-deep-brown/60 space-y-1">
                    <p>✓ {t('packageInfo1')}</p>
                    <p>✓ {t('packageInfo2')}</p>
                </div>

                {/* Wholesale Price */}
                <div className="pt-2 border-t border-deep-brown/10 mt-auto">
                    <p className="text-sm text-deep-brown/60 mb-1">{t('wholesalePriceLabel')}:</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-deep-brown">
                            Rp{product.wholesalePrice.toLocaleString('id-ID')}
                        </span>
                        <span className="text-sm text-deep-brown/60">/ pcs</span>
                    </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                    {product.highlights.slice(0, 3).map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-deep-brown/70">
                            <span className="text-warm-sand">✓</span>
                            <span>{t(highlight)}</span>
                        </div>
                    ))}
                </div>

                {/* View Button */}
                <Link
                    href={`/catalog/${product.id}`}
                    className="block w-full text-center px-6 py-3 border-2 border-deep-brown text-deep-brown font-semibold rounded-md hover:bg-deep-brown hover:text-white transition-all duration-300 mt-4"
                >
                    {t('viewDetails')}
                </Link>
            </div>
        </div>
    );
}
