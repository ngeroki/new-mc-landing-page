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
        <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group h-full flex flex-col border border-deep-brown/5">
            {/* Product Image */}
            <Link href={`/catalog/${product.id}`} className="relative block aspect-square bg-[#FDFBF7] overflow-hidden">
                <div className="w-full h-full relative">
                    {/* Main Image - Maximum Size on Mobile */}
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-0 md:p-6 group-hover:opacity-0 transition-all duration-500 z-10"
                        priority={priority}
                    />

                    {/* Lifestyle/Hover Image - Maximum Size on Mobile */}
                    <Image
                        src={product.lifestyleImage || product.image}
                        alt={`${product.name} lifestyle`}
                        fill
                        className={`object-contain p-0 md:p-6 absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 z-20 ${!product.lifestyleImage ? 'scale-110' : 'object-cover'}`}
                    />
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-30 pointer-events-none">
                    {product.isBestseller && (
                        <span className="px-3 py-1 bg-warm-sand text-white text-xs font-bold rounded-full shadow-md">
                            {t('bestseller')}
                        </span>
                    )}
                    {product.isNew && (
                        <span className="px-3 py-1 bg-deep-brown text-white text-xs font-bold rounded-full shadow-md">
                            {t('new')}
                        </span>
                    )}
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-5 space-y-4 flex flex-col flex-grow">
                {/* Product Name - Larger on Mobile */}
                <Link href={`/catalog/${product.id}`} className="block">
                    <h3 className="text-xl md:text-xl font-heading font-semibold text-deep-brown group-hover:text-warm-sand transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                        {product.name}
                    </h3>
                </Link>

                {/* Wholesale Info Badges - Compact */}
                <div className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FEF1DE] rounded-lg">
                        <span className="text-base">📦</span>
                        <span className="text-xs font-semibold text-deep-brown">MOQ {product.moq} pcs</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FEF1DE] rounded-lg">
                        <span className="text-base">📏</span>
                        <span className="text-xs font-semibold text-deep-brown">{product.sizeRun}</span>
                    </div>
                </div>

                {/* Package Info - Compact */}
                <div className="text-xs text-deep-brown/60 space-y-1 border-l-2 border-warm-sand/30 pl-3">
                    <p className="flex items-start gap-1">
                        <span className="text-warm-sand mt-0.5">✓</span>
                        <span>{t('packageInfo1')}</span>
                    </p>
                    <p className="flex items-start gap-1">
                        <span className="text-warm-sand mt-0.5">✓</span>
                        <span>{t('packageInfo2')}</span>
                    </p>
                </div>

                {/* Highlights - Hidden on Mobile */}
                <div className="hidden md:flex md:flex-col space-y-1.5 pt-2 border-t border-deep-brown/10">
                    {product.highlights.slice(0, 3).map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-deep-brown/70">
                            <span className="text-warm-sand text-sm mt-0.5">✓</span>
                            <span className="flex-1">{t(highlight)}</span>
                        </div>
                    ))}
                </div>

                {/* Price Section - Smaller on Mobile */}
                <div className="pt-3 border-t border-deep-brown/10 mt-auto text-center">
                    <p className="text-xs text-deep-brown/60 mb-2 font-medium">{t('wholesalePrice')}:</p>
                    <div className="flex flex-nowrap items-baseline justify-center gap-1.5">
                        <span className="text-xl md:text-3xl font-bold text-deep-brown whitespace-nowrap">
                            Rp{product.wholesalePrice.toLocaleString('id-ID')}
                        </span>
                        <span className="text-xs md:text-sm text-deep-brown/60 font-medium whitespace-nowrap">/ pcs</span>
                    </div>
                </div>

                {/* View Button - Simpler on Mobile */}
                <Link
                    href={`/catalog/${product.id}`}
                    className="block w-full text-center px-4 py-2.5 md:px-6 md:py-3 bg-deep-brown text-white text-sm md:text-base font-semibold rounded-lg hover:bg-warm-sand transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] mt-3"
                >
                    <span className="md:hidden">Lihat Detail</span>
                    <span className="hidden md:inline">{t('viewDetails')}</span>
                </Link>
            </div>
        </div>
    );
}
