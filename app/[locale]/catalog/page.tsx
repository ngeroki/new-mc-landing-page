'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/routing';

// Product type definition
type Product = {
    id: string;
    name: string;
    category: 'men' | 'women' | 'kids';
    type: 'flipflop' | 'slipper' | 'casual' | 'sandal';
    image: string;
    wholesalePrice: number;
    moq: number;
    sizeRun: string;
    highlights: string[];
    isBestseller?: boolean;
    isNew?: boolean;
};

export default function CatalogPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('bestseller');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Sample product data - replace with real data from API/database
    const products: Product[] = [
        {
            id: 'men-01',
            name: 'New MC – Selop Pria 01',
            category: 'men',
            type: 'slipper',
            image: '/images/product-slipper.jpg',
            wholesalePrice: 45000,
            moq: 5,
            sizeRun: '38–43',
            highlights: ['Kualitas Premium', 'Cocok untuk Toko Daerah', 'Stok Stabil'],
            isBestseller: true,
        },
        {
            id: 'women-01',
            name: 'New MC – Sandal Wanita 01',
            category: 'women',
            type: 'sandal',
            image: '/images/product-women.jpg',
            wholesalePrice: 42000,
            moq: 5,
            sizeRun: '36–40',
            highlights: ['Kualitas Premium', 'Cocok untuk Toko Daerah', 'Stok Stabil'],
            isBestseller: true,
        },
        {
            id: 'men-02',
            name: 'New MC – Sandal Pria 02',
            category: 'men',
            type: 'sandal',
            image: '/images/product-men.jpg',
            wholesalePrice: 48000,
            moq: 5,
            sizeRun: '38–43',
            highlights: ['Kualitas Premium', 'Cocok untuk Toko Daerah', 'Stok Stabil'],
        },
        {
            id: 'men-03',
            name: 'New MC – Sandal Jepit Pria 03',
            category: 'men',
            type: 'flipflop',
            image: '/images/product-flipflop.jpg',
            wholesalePrice: 35000,
            moq: 5,
            sizeRun: '38–43',
            highlights: ['Kualitas Premium', 'Cocok untuk Toko Daerah', 'Stok Stabil'],
            isNew: true,
        },
        {
            id: 'kids-01',
            name: 'New MC – Sandal Anak 01',
            category: 'kids',
            type: 'sandal',
            image: '/images/product-kids.jpg',
            wholesalePrice: 38000,
            moq: 5,
            sizeRun: '28–35',
            highlights: ['Kualitas Premium', 'Cocok untuk Toko Daerah', 'Stok Stabil'],
        },
        {
            id: 'men-04',
            name: 'New MC – Sandal Kasual Pria 04',
            category: 'men',
            type: 'casual',
            image: '/images/product-casual.jpg',
            wholesalePrice: 52000,
            moq: 5,
            sizeRun: '38–43',
            highlights: ['Kualitas Premium', 'Cocok untuk Toko Daerah', 'Stok Stabil'],
            isNew: true,
        },
    ];

    // Filter and sort logic
    const filteredProducts = products
        .filter(p => {
            if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
            if (selectedType !== 'all' && p.type !== selectedType) return false;
            if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'bestseller') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
            if (sortBy === 'cheapest') return a.wholesalePrice - b.wholesalePrice;
            if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
            return 0;
        });

    return (
        <main className="min-h-screen pt-24 bg-white">
            {/* Page Header */}
            <section className="py-16 bg-gradient-to-b from-[#FDFBF7] to-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-deep-brown mb-6">
                            Katalog Produk New MC
                        </h1>
                        <p className="text-lg md:text-xl text-deep-brown/70 leading-relaxed">
                            Pilihan model sandal grosir berkualitas untuk toko-toko di seluruh Indonesia.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter + Sort Bar */}
            <section className="sticky top-24 z-40 bg-white border-b border-deep-brown/10 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Left: Filters */}
                        <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2.5 rounded-lg border border-deep-brown/20 bg-white text-deep-brown font-medium focus:border-warm-sand focus:ring-2 focus:ring-warm-sand/20 outline-none transition-all cursor-pointer"
                            >
                                <option value="all">Semua Kategori</option>
                                <option value="men">Pria</option>
                                <option value="women">Wanita</option>
                                <option value="kids">Anak</option>
                            </select>

                            {/* Type Filter */}
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="px-4 py-2.5 rounded-lg border border-deep-brown/20 bg-white text-deep-brown font-medium focus:border-warm-sand focus:ring-2 focus:ring-warm-sand/20 outline-none transition-all cursor-pointer"
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
                                className="px-4 py-2.5 rounded-lg border border-deep-brown/20 bg-white text-deep-brown font-medium focus:border-warm-sand focus:ring-2 focus:ring-warm-sand/20 outline-none transition-all cursor-pointer"
                            >
                                <option value="bestseller">Terlaris</option>
                                <option value="cheapest">Termurah</option>
                                <option value="newest">Paling Baru</option>
                            </select>
                        </div>

                        {/* Right: Search */}
                        <div className="relative w-full lg:w-80">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari model sandal…"
                                className="w-full px-4 py-2.5 pl-11 rounded-lg border border-deep-brown/20 bg-white text-deep-brown focus:border-warm-sand focus:ring-2 focus:ring-warm-sand/20 outline-none transition-all"
                            />
                            <svg
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-deep-brown/40"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    {/* Results count */}
                    <div className="mb-8">
                        <p className="text-deep-brown/60 text-sm">
                            Menampilkan <span className="font-semibold text-deep-brown">{filteredProducts.length}</span> produk
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                            >
                                {/* Product Image */}
                                <div className="relative aspect-square overflow-hidden bg-[#FDFBF7]">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                                    <h3 className="text-xl font-heading font-semibold text-deep-brown group-hover:text-warm-sand transition-colors">
                                        {product.name}
                                    </h3>

                                    {/* Wholesale Metadata */}
                                    <div className="flex flex-wrap gap-2">
                                        <span className="inline-flex items-center px-3 py-1 bg-[#FEF1DE] text-deep-brown text-xs font-medium rounded-full">
                                            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            MOQ {product.moq} pcs
                                        </span>
                                        <span className="inline-flex items-center px-3 py-1 bg-[#FEF1DE] text-deep-brown text-xs font-medium rounded-full">
                                            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                            </svg>
                                            Ukuran {product.sizeRun}
                                        </span>
                                    </div>

                                    <div className="pt-2 border-t border-deep-brown/10">
                                        <p className="text-xs text-deep-brown/60 mb-1">1 Paket = Semua Ukuran</p>
                                        <p className="text-xs text-deep-brown/60">Tidak bisa pilih ukuran satuan</p>
                                    </div>

                                    {/* Wholesale Price */}
                                    <div className="pt-2">
                                        <p className="text-sm text-deep-brown/60 mb-1">Harga Grosir</p>
                                        <p className="text-2xl font-heading font-bold text-deep-brown">
                                            Rp{product.wholesalePrice.toLocaleString('id-ID')}
                                            <span className="text-sm font-normal text-deep-brown/60"> / pcs</span>
                                        </p>
                                    </div>

                                    {/* Highlights */}
                                    <div className="space-y-2 pt-2">
                                        {product.highlights.map((highlight, idx) => (
                                            <div key={idx} className="flex items-center text-sm text-deep-brown/70">
                                                <svg className="w-4 h-4 text-warm-sand mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                {highlight}
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <Link href={`/catalog/${product.id}`}>
                                        <button className="w-full mt-4 px-6 py-3 border-2 border-deep-brown text-deep-brown font-semibold rounded-lg hover:bg-deep-brown hover:text-white transition-all duration-300 transform hover:scale-[1.02]">
                                            Lihat Detail Produk
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Load More / Pagination */}
                    {filteredProducts.length > 0 && (
                        <div className="mt-16 text-center">
                            <button className="px-8 py-3 bg-white border-2 border-deep-brown/20 text-deep-brown font-semibold rounded-lg hover:border-warm-sand hover:text-warm-sand transition-all duration-300">
                                Muat Lebih Banyak
                            </button>
                        </div>
                    )}

                    {/* No Results */}
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-16">
                            <svg className="w-16 h-16 text-deep-brown/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-lg text-deep-brown/60">Tidak ada produk yang sesuai dengan filter Anda</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
