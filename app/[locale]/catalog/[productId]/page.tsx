'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/routing';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { use } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = use(params);
    const t = useTranslations('products');

    const productImages: { [key: string]: string } = {
        men: '/images/product-men.jpg',
        women: '/images/product-women.jpg',
        kids: '/images/product-kids.jpg',
        flipflop: '/images/product-flipflop.jpg',
        slipper: '/images/product-slipper.jpg',
        casual: '/images/product-casual.jpg',
    };

    const relatedProducts = Object.keys(productImages)
        .filter(id => id !== productId)
        .slice(0, 3);

    return (
        <main className="min-h-screen pt-24">
            {/* Product Detail Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                        {/* Product Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-xl"
                        >
                            <Image
                                src={productImages[productId] || '/images/product-men.jpg'}
                                alt={t(`${productId}.title`)}
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div>
                                <Link href="/catalog" className="text-warm-sand hover:text-deep-brown mb-4 inline-block">
                                    ← Kembali ke Katalog
                                </Link>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-deep-brown mb-4">
                                    {t(`${productId}.title`)}
                                </h1>
                                <div className="w-20 h-1 bg-warm-sand mb-6"></div>
                            </div>

                            <p className="text-lg text-deep-brown/80 leading-relaxed">
                                {t(`${productId}.description`)}
                            </p>

                            <div className="space-y-4 py-6 border-t border-b border-deep-brown/10">
                                <h3 className="text-xl font-heading font-semibold text-deep-brown">
                                    Keunggulan Produk
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <svg className="w-6 h-6 text-warm-sand mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-deep-brown/80">Kualitas material premium dan tahan lama</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-6 h-6 text-warm-sand mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-deep-brown/80">Harga grosir yang kompetitif</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-6 h-6 text-warm-sand mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-deep-brown/80">Tersedia dalam berbagai ukuran</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-6 h-6 text-warm-sand mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-deep-brown/80">Pengiriman ke seluruh Indonesia</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="pt-6">
                                <WhatsAppButton />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            <section className="py-16 bg-[#FEF1DE]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-semibold text-deep-brown text-center mb-12">
                        Produk Terkait
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedProducts.map((id, index) => (
                            <motion.div
                                key={id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <Link href={`/catalog/${id}`}>
                                    <div className="relative w-full h-64 overflow-hidden">
                                        <Image
                                            src={productImages[id]}
                                            alt={t(`${id}.title`)}
                                            fill
                                            className="object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-heading font-semibold text-deep-brown mb-3">
                                            {t(`${id}.title`)}
                                        </h3>
                                        <p className="text-base text-deep-brown/70 mb-4 leading-relaxed line-clamp-2">
                                            {t(`${id}.description`)}
                                        </p>
                                        <span className="inline-block text-warm-sand font-semibold hover:text-deep-brown transition-colors">
                                            Lihat Detail →
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
