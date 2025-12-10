'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/routing';
import { products } from '@/app/data/products';

export default function NewArrivalsPage() {
    const t = useTranslations('catalog');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
    const [displayCount, setDisplayCount] = useState<number>(12);

    // Filter only new products
    const newProducts = products.filter((product) => product.isNew);
    const displayedProducts = newProducts.slice(0, displayCount);
    const hasMore = displayCount < newProducts.length;

    return (
        <main className="min-h-screen bg-white pt-20">
            {/* Page Header */}
            <section className="bg-gradient-to-b from-[#FDFBF7] to-white py-12">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-block mb-4">
                            <span className="px-4 py-2 bg-deep-brown text-white text-sm font-semibold rounded-full">
                                ✨ {t('newArrivals')}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-deep-brown mb-4">
                            {t('newArrivalsTitle')}
                        </h1>
                        <p className="text-lg text-deep-brown/70 max-w-2xl mx-auto">
                            {t('newArrivalsSubtitle')}
                        </p>
                        <div className="mt-6 text-sm text-deep-brown/60">
                            {newProducts.length} {t('products')}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-12" ref={ref}>
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    {displayedProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-heading font-semibold text-deep-brown mb-2">
                                {t('noProducts')}
                            </h3>
                            <p className="text-deep-brown/60">
                                {t('noProductsDescription')}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {displayedProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                        onMouseEnter={() => setHoveredProduct(product.id)}
                                        onMouseLeave={() => setHoveredProduct(null)}
                                    >
                                        {/* Product Image */}
                                        <Link href={`/catalog/${product.id}`}>
                                            <div className="relative aspect-square bg-[#FDFBF7] overflow-hidden">
                                                <Image
                                                    src={hoveredProduct === product.id && product.lifestyleImage ? product.lifestyleImage : product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-contain p-4 group-hover:scale-105 transition-all duration-500"
                                                />
                                                {/* Badges */}
                                                <div className="absolute top-3 left-3 flex flex-col gap-2">
                                                    <span className="px-3 py-1 bg-deep-brown text-white text-xs font-semibold rounded-full">
                                                        {t('new')}
                                                    </span>
                                                    {product.isBestseller && (
                                                        <span className="px-3 py-1 bg-warm-sand text-white text-xs font-semibold rounded-full">
                                                            {t('bestseller')}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Product Info */}
                                        <div className="p-6 space-y-4">
                                            {/* Product Name */}
                                            <h3 className="text-xl font-heading font-semibold text-deep-brown">
                                                {product.name}
                                            </h3>

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
                                            <div className="pt-2 border-t border-deep-brown/10">
                                                <p className="text-sm text-deep-brown/60 mb-1">{t('wholesalePrice')}:</p>
                                                <p className="text-2xl font-bold text-deep-brown">
                                                    Rp{product.wholesalePrice.toLocaleString('id-ID')}
                                                    <span className="text-sm font-normal text-deep-brown/60"> / pcs</span>
                                                </p>
                                            </div>

                                            {/* Highlights */}
                                            <div className="space-y-2">
                                                {product.highlights.slice(0, 3).map((highlight, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-xs text-deep-brown/70">
                                                        <span className="text-warm-sand">✓</span>
                                                        <span>{highlight}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* View Button */}
                                            <Link
                                                href={`/catalog/${product.id}`}
                                                className="block w-full text-center px-6 py-3 border-2 border-deep-brown text-deep-brown font-semibold rounded-md hover:bg-deep-brown hover:text-white transition-all duration-300"
                                            >
                                                {t('viewDetails')}
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Load More Button */}
                            {hasMore && (
                                <div className="text-center mt-12">
                                    <button
                                        onClick={() => setDisplayCount(displayCount + 12)}
                                        className="px-8 py-3 border-2 border-deep-brown text-deep-brown font-semibold rounded-md hover:bg-deep-brown hover:text-white transition-all duration-300"
                                    >
                                        {t('loadMore')} ({newProducts.length - displayCount} {t('moreProducts')})
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
