'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/routing';
import { products } from '@/app/data/products';

export default function CatalogPage() {
    const t = useTranslations();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('bestseller');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [displayCount, setDisplayCount] = useState<number>(12);
    const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

    // Filter products
    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesType = selectedType === 'all' || product.type === selectedType;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesType && matchesSearch;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'bestseller') {
            if (a.isBestseller && !b.isBestseller) return -1;
            if (!a.isBestseller && b.isBestseller) return 1;
            return 0;
        }
        if (sortBy === 'cheapest') return a.wholesalePrice - b.wholesalePrice;
        if (sortBy === 'newest') {
            if (a.isNew && !b.isNew) return -1;
            if (!a.isNew && b.isNew) return 1;
            return 0;
        }
        return 0;
    });

    // Paginated products
    const displayedProducts = sortedProducts.slice(0, displayCount);
    const hasMore = displayCount < sortedProducts.length;

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
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-deep-brown mb-4">
                            Katalog Produk New MC
                        </h1>
                        <p className="text-lg text-deep-brown/70 max-w-2xl mx-auto">
                            Pilihan model sandal grosir berkualitas premium untuk toko Anda
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter & Sort Bar */}
            <section className="sticky top-16 z-40 bg-white border-b border-deep-brown/10 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Category Filter */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-deep-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-warm-sand text-deep-brown bg-white"
                        >
                            <option value="all">Semua Kategori</option>
                            <option value="men">Pria</option>
                            <option value="women">Wanita</option>
                            <option value="kids">Anak</option>
                            <option value="unisex">Unisex</option>
                        </select>

                        {/* Type Filter */}
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="px-4 py-2 border border-deep-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-warm-sand text-deep-brown bg-white"
                        >
                            <option value="all">Semua Tipe</option>
                            <option value="sandal">Sandal</option>
                            <option value="slipper">Selop</option>
                            <option value="flipflop">Sandal Jepit</option>
                            <option value="casual">Kasual</option>
                        </select>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-deep-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-warm-sand text-deep-brown bg-white"
                        >
                            <option value="bestseller">Terlaris</option>
                            <option value="cheapest">Termurah</option>
                            <option value="newest">Paling Baru</option>
                        </select>

                        {/* Search */}
                        <div className="flex-1 w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Cari model sandal…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-deep-brown/20 rounded-md focus:outline-none focus:ring-2 focus:ring-warm-sand text-deep-brown"
                            />
                        </div>

                        {/* Results Count */}
                        <div className="text-sm text-deep-brown/60 whitespace-nowrap">
                            {sortedProducts.length} produk
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-12" ref={ref}>
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    {displayedProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-heading font-semibold text-deep-brown mb-2">
                                Tidak ada produk ditemukan
                            </h3>
                            <p className="text-deep-brown/60">
                                Coba ubah filter atau kata kunci pencarian Anda
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
                                        <div className="relative aspect-square bg-[#FDFBF7] overflow-hidden">
                                            <Image
                                                src={hoveredProduct === product.id && product.lifestyleImage ? product.lifestyleImage : product.image}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-4 group-hover:scale-105 transition-all duration-500"
                                            />
                                            {/* Badges */}
                                            <div className="absolute top-3 left-3 flex flex-col gap-2">
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
                                                    <span>📏</span> Ukuran {product.sizeRun}
                                                </span>
                                            </div>

                                            {/* Package Info */}
                                            <div className="text-xs text-deep-brown/60 space-y-1">
                                                <p>✓ 1 Paket = Semua Ukuran</p>
                                                <p>✓ Tidak bisa pilih ukuran satuan</p>
                                            </div>

                                            {/* Wholesale Price */}
                                            <div className="pt-2 border-t border-deep-brown/10">
                                                <p className="text-sm text-deep-brown/60 mb-1">Harga Grosir:</p>
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
                                                Lihat Detail Produk
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
                                        Muat Lebih Banyak ({sortedProducts.length - displayCount} produk lagi)
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
