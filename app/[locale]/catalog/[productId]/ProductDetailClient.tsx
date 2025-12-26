'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/routing';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { products } from '@/app/data/products';
import CompactProductCard from '@/app/components/CompactProductCard';

export default function ProductDetailClient({ productId }: { productId: string }) {
    const t = useTranslations('catalog');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Find the product with fallback logic
    let product = products.find((p) => p.id === productId);

    // Fallback: Check if ID needs decoding
    if (!product) {
        const decodedId = decodeURIComponent(productId);
        product = products.find((p) => p.id === decodedId);
    }

    // Fallback: Check if searching by Name (slugified/or direct match)
    if (!product) {
        product = products.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === productId.toLowerCase());
    }

    // Get related products (same category, different product)
    const relatedProducts = products
        .filter((p) => product && p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const [selectedImage, setSelectedImage] = useState<'product' | 'lifestyle'>('product');

    if (!product) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center p-8">
                    <h1 className="text-3xl font-heading font-semibold text-deep-brown mb-4">
                        {t('productNotFound')}
                    </h1>
                    <p className="text-red-500 mb-6 font-mono bg-red-50 p-2 rounded">
                        Debug ID: {productId} | Loaded: {products.length}
                    </p>
                    <Link
                        href="/catalog"
                        className="inline-block px-8 py-3 bg-deep-brown text-white font-semibold rounded-md hover:bg-[#3A2819] transition-colors"
                    >
                        {t('backToCatalog')}
                    </Link>
                </div>
            </main>
        );
    }

    // JSON-LD for AI Search Engines & Rich Snippets
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.image,
        description: `${product.name} - ${product.category} sandals for wholesale. MOQ ${product.moq} pcs. Size run ${product.sizeRun}.`,
        brand: {
            '@type': 'Brand',
            name: 'New MC'
        },
        offers: {
            '@type': 'Offer',
            price: product.wholesalePrice,
            priceCurrency: 'IDR',
            availability: 'https://schema.org/InStock',
            url: `https://new-mc-website.vercel.app/catalog/${productId}`,
            priceValidUntil: '2026-12-31',
            seller: {
                '@type': 'Organization',
                name: 'New MC Sandal'
            }
        },
        additionalProperty: [
            {
                '@type': 'PropertyValue',
                name: 'MOQ',
                value: product.moq
            },
            {
                '@type': 'PropertyValue',
                name: 'Size Run',
                value: product.sizeRun
            }
        ]
    };

    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Breadcrumb */}
            <section className="bg-[#FDFBF7] py-4">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex items-center gap-2 text-sm text-deep-brown/60">
                        <Link href="/" className="hover:text-deep-brown">{t('home')}</Link>
                        <span>/</span>
                        <Link href="/catalog" className="hover:text-deep-brown">{t('backToCatalog').replace('← ', '')}</Link>
                        <span>/</span>
                        <span className="text-deep-brown font-medium">{product.name}</span>
                    </div>
                </div>
            </section>

            {/* Product Detail */}
            <section className="py-12" ref={ref}>
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                        {/* Product Images */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="space-y-4"
                        >
                            {/* Main Image */}
                            <div className="relative aspect-square bg-[#FDFBF7] rounded-lg overflow-hidden">
                                <Image
                                    src={selectedImage === 'product' ? product.image : (product.lifestyleImage || product.image)}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-8"
                                    priority
                                />
                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.isBestseller && (
                                        <span className="px-3 py-1 bg-warm-sand text-white text-xs font-semibold rounded-full">
                                            {t('bestseller')}
                                        </span>
                                    )}
                                    {product.isNew && (
                                        <span className="px-3 py-1 bg-deep-brown text-white text-xs font-semibold rounded-full">
                                            {t('new')}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Image Selector */}
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setSelectedImage('product')}
                                    className={`flex-1 relative aspect-square bg-[#FDFBF7] rounded-lg overflow-hidden border-2 transition-all ${selectedImage === 'product' ? 'border-warm-sand' : 'border-transparent'
                                        }`}
                                >
                                    <Image
                                        src={product.image}
                                        alt="Product view"
                                        fill
                                        className="object-contain p-4"
                                    />

                                </button>
                                <button
                                    onClick={() => setSelectedImage('lifestyle')}
                                    className={`flex-1 relative aspect-square bg-[#FDFBF7] rounded-lg overflow-hidden border-2 transition-all ${selectedImage === 'lifestyle' ? 'border-warm-sand' : 'border-transparent'
                                        }`}
                                >
                                    {product.lifestyleImage ? (
                                        <Image
                                            src={product.lifestyleImage}
                                            alt="Lifestyle view"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FDFBF7] to-[#FEF1DE]">
                                            <div className="text-center p-4">
                                                <div className="text-4xl mb-2">📸</div>
                                                <p className="text-xs text-deep-brown/60">{t('lifestyleLabel')}</p>
                                                <p className="text-xs text-deep-brown/40 mt-1">{t('lifestyleComingSoon')}</p>
                                            </div>
                                        </div>
                                    )}

                                </button>
                            </div>
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Title */}
                            <div>
                                <h1 className="text-3xl md:text-4xl font-heading font-semibold text-deep-brown mb-2">
                                    {product.name}
                                </h1>
                                <p className="text-deep-brown/60">{t('productCode')}: {product.id.toUpperCase()}</p>
                            </div>

                            {/* Price */}
                            <div className="bg-[#FEF1DE] p-6 rounded-lg">
                                <p className="text-sm text-deep-brown/70 mb-2">{t('wholesalePriceLabel')}:</p>
                                <p className="text-4xl font-bold text-deep-brown">
                                    Rp{product.wholesalePrice.toLocaleString('id-ID')}
                                </p>
                            </div>

                            {/* Wholesale Info */}
                            <div className="space-y-4 border-t border-b border-deep-brown/10 py-6">
                                <h3 className="font-heading font-semibold text-deep-brown text-lg">
                                    {t('wholesaleInfo')}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white border border-deep-brown/10 p-4 rounded-lg">
                                        <p className="text-xs text-deep-brown/60 mb-1">{t('minimumOrder')}</p>
                                        <p className="text-xl font-bold text-deep-brown">{product.moq} Pcs</p>
                                    </div>
                                    <div className="bg-white border border-deep-brown/10 p-4 rounded-lg">
                                        <p className="text-xs text-deep-brown/60 mb-1">{t('sizeRange')}</p>
                                        <p className="text-xl font-bold text-deep-brown">{product.sizeRun}</p>
                                    </div>
                                </div>
                                <div className="bg-[#FDFBF7] p-4 rounded-lg space-y-2 text-sm text-deep-brown/70">
                                    <p>✓ {t('packageNote1')}</p>
                                    <p>✓ {t('packageNote2')}</p>
                                    <p>✓ {t('packageNote3')}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="font-heading font-semibold text-deep-brown text-lg mb-3">
                                    {t('productDescription')}
                                </h3>
                                <p className="text-deep-brown/70 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Product Advantages */}
                            <div>
                                <h3 className="font-heading font-semibold text-deep-brown text-lg mb-3">
                                    {t('productAdvantages')}
                                </h3>
                                <div className="space-y-3">
                                    {product.highlights.map((highlight, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <span className="text-warm-sand text-xl">✓</span>
                                            <span className="text-deep-brown/70">{t(highlight)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="pt-6">
                                <WhatsAppButton />
                                <Link
                                    href="/catalog"
                                    className="block text-center mt-4 text-warm-sand hover:underline"
                                >
                                    ← {t('backToCatalog')}
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-16 md:py-20 bg-gradient-to-b from-[#FDFBF7] to-white">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        {/* Section Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-deep-brown mb-3">
                                {t('relatedProducts')}
                            </h2>
                            <p className="text-deep-brown/60 text-sm md:text-base max-w-2xl mx-auto">
                                Produk serupa yang mungkin Anda sukai
                            </p>
                        </motion.div>

                        {/* Desktop: Grid Layout */}
                        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct, index) => (
                                <motion.div
                                    key={relatedProduct.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <CompactProductCard product={relatedProduct} />
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile: Horizontal Scroll */}
                        <div className="md:hidden">
                            {/* Scroll Hint */}
                            <div className="flex items-center justify-center gap-2 mb-4 text-xs text-deep-brown/50">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                                <span>Geser untuk melihat lebih banyak</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>

                            <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-6 px-6">
                                <div className="flex gap-4 pb-4">
                                    {relatedProducts.map((relatedProduct) => (
                                        <motion.div
                                            key={relatedProduct.id}
                                            className="min-w-[55%] sm:min-w-[40%] snap-start"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <CompactProductCard product={relatedProduct} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Scroll Progress Dots */}
                            <div className="flex justify-center gap-2 mt-4">
                                {relatedProducts.map((_, index) => (
                                    <div
                                        key={index}
                                        className="w-2 h-2 rounded-full bg-deep-brown/20 transition-all duration-300"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* View All Link */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-center mt-10"
                        >
                            <Link
                                href="/catalog"
                                className="inline-flex items-center gap-2 text-deep-brown hover:text-warm-sand font-semibold transition-colors duration-300 group"
                            >
                                <span>Lihat Semua Produk</span>
                                <svg
                                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            )}
        </main>
    );
}
