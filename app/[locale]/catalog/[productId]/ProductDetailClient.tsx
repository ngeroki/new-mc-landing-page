'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/routing';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { products } from '@/app/data/products';

export default function ProductDetailClient({ productId }: { productId: string }) {
    const t = useTranslations();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Find the product
    const product = products.find((p) => p.id === productId);

    // Get related products (same category, different product)
    const relatedProducts = products
        .filter((p) => p.category === product?.category && p.id !== productId)
        .slice(0, 3);

    const [selectedImage, setSelectedImage] = useState<'product' | 'lifestyle'>('product');

    if (!product) {
        return (
            <main className="min-h-screen bg-white pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-heading font-semibold text-deep-brown mb-4">
                        Produk Tidak Ditemukan
                    </h1>
                    <Link
                        href="/catalog"
                        className="text-warm-sand hover:underline"
                    >
                        Kembali ke Katalog
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white pt-20">
            {/* Breadcrumb */}
            <section className="bg-[#FDFBF7] py-4">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex items-center gap-2 text-sm text-deep-brown/60">
                        <Link href="/" className="hover:text-deep-brown">Beranda</Link>
                        <span>/</span>
                        <Link href="/catalog" className="hover:text-deep-brown">Katalog</Link>
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
                                            Terlaris
                                        </span>
                                    )}
                                    {product.isNew && (
                                        <span className="px-3 py-1 bg-deep-brown text-white text-xs font-semibold rounded-full">
                                            Baru
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
                                    <div className="absolute bottom-2 left-0 right-0 text-center">
                                        <span className="text-xs bg-white/90 px-2 py-1 rounded">Produk</span>
                                    </div>
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
                                                <p className="text-xs text-deep-brown/60">Lifestyle Photo</p>
                                                <p className="text-xs text-deep-brown/40 mt-1">Coming Soon</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute bottom-2 left-0 right-0 text-center">
                                        <span className="text-xs bg-white/90 px-2 py-1 rounded">Lifestyle</span>
                                    </div>
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
                                <p className="text-deep-brown/60">Kode: {product.id.toUpperCase()}</p>
                            </div>

                            {/* Price */}
                            <div className="bg-[#FEF1DE] p-6 rounded-lg">
                                <p className="text-sm text-deep-brown/70 mb-2">Harga Grosir (per pcs):</p>
                                <p className="text-4xl font-bold text-deep-brown">
                                    Rp{product.wholesalePrice.toLocaleString('id-ID')}
                                </p>
                            </div>

                            {/* Wholesale Info */}
                            <div className="space-y-4 border-t border-b border-deep-brown/10 py-6">
                                <h3 className="font-heading font-semibold text-deep-brown text-lg">
                                    Informasi Grosir
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white border border-deep-brown/10 p-4 rounded-lg">
                                        <p className="text-xs text-deep-brown/60 mb-1">Minimum Order</p>
                                        <p className="text-xl font-bold text-deep-brown">{product.moq} Pcs</p>
                                    </div>
                                    <div className="bg-white border border-deep-brown/10 p-4 rounded-lg">
                                        <p className="text-xs text-deep-brown/60 mb-1">Ukuran Paket</p>
                                        <p className="text-xl font-bold text-deep-brown">{product.sizeRun}</p>
                                    </div>
                                </div>
                                <div className="bg-[#FDFBF7] p-4 rounded-lg space-y-2 text-sm text-deep-brown/70">
                                    <p>✓ 1 Paket berisi semua ukuran dalam range</p>
                                    <p>✓ Tidak bisa pilih ukuran satuan</p>
                                    <p>✓ Harga sudah termasuk semua ukuran</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="font-heading font-semibold text-deep-brown text-lg mb-3">
                                    Deskripsi Produk
                                </h3>
                                <p className="text-deep-brown/70 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Product Advantages */}
                            <div>
                                <h3 className="font-heading font-semibold text-deep-brown text-lg mb-3">
                                    Keunggulan Produk
                                </h3>
                                <div className="space-y-3">
                                    {product.highlights.map((highlight, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <span className="text-warm-sand text-xl">✓</span>
                                            <span className="text-deep-brown/70">{highlight}</span>
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
                                    ← Kembali ke Katalog
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-12 bg-[#FDFBF7]">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-deep-brown mb-8 text-center">
                            Produk Terkait
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProducts.map((relatedProduct) => (
                                <Link
                                    key={relatedProduct.id}
                                    href={`/catalog/${relatedProduct.id}`}
                                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                >
                                    <div className="relative aspect-square bg-[#FDFBF7] overflow-hidden">
                                        <Image
                                            src={relatedProduct.image}
                                            alt={relatedProduct.name}
                                            fill
                                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-heading font-semibold text-deep-brown mb-2">
                                            {relatedProduct.name}
                                        </h3>
                                        <p className="text-lg font-bold text-warm-sand">
                                            Rp{relatedProduct.wholesalePrice.toLocaleString('id-ID')} / pcs
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
