'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { products } from '@/app/data/products';
import ProductCard from '@/app/components/ProductCard';

function CatalogContent() {
    const t = useTranslations('catalog');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const searchParams = useSearchParams();

    // Get initial values from URL query parameters
    const categoryFromUrl = searchParams.get('category') || 'all';
    const filterFromUrl = searchParams.get('filter') || 'all'; // 'all', 'bestseller', 'new'

    const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl);
    const [selectedType, setSelectedType] = useState<string>('all');
    const [selectedFilter, setSelectedFilter] = useState<string>(filterFromUrl);
    const [sortBy, setSortBy] = useState<string>(filterFromUrl === 'bestseller' ? 'bestseller' : filterFromUrl === 'new' ? 'newest' : 'bestseller');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [displayCount, setDisplayCount] = useState<number>(8);

    // Update filters when URL changes
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        const filterParam = searchParams.get('filter');

        if (categoryParam && ['men', 'women', 'kids'].includes(categoryParam)) {
            setSelectedCategory(categoryParam);
        }
        if (filterParam && ['all', 'bestseller', 'new'].includes(filterParam)) {
            setSelectedFilter(filterParam);
            if (filterParam === 'bestseller') setSortBy('bestseller');
            if (filterParam === 'new') setSortBy('newest');
        }
    }, [searchParams]);

    const getPageTitle = () => {
        if (selectedFilter === 'bestseller') return t('bestsellersTitle');
        if (selectedFilter === 'new') return t('newArrivalsTitle');
        return t('catalogTitle');
    };

    const getPageSubtitle = () => {
        if (selectedFilter === 'bestseller') return t('bestsellersSubtitle');
        if (selectedFilter === 'new') return t('newArrivalsSubtitle');
        return t('catalogSubtitle');
    };

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesType = selectedType === 'all' || product.type === selectedType;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.id.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesSpecialFilter = true;
        if (selectedFilter === 'bestseller') matchesSpecialFilter = product.isBestseller === true;
        if (selectedFilter === 'new') matchesSpecialFilter = product.isNew === true;

        return matchesCategory && matchesType && matchesSearch && matchesSpecialFilter;
    });

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
        if (sortBy === 'nameAsc') return a.name.localeCompare(b.name);
        if (sortBy === 'nameDesc') return b.name.localeCompare(a.name);
        return 0;
    });

    const displayedProducts = sortedProducts.slice(0, displayCount);
    const hasMore = displayCount < sortedProducts.length;

    return (
        <main className="min-h-screen bg-white">
            <section className="bg-gradient-to-b from-[#FDFBF7] to-white py-12">
                <div className="w-full px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-2xl md:text-5xl lg:text-6xl font-heading font-semibold text-deep-brown mb-4">
                            {getPageTitle()}
                        </h1>
                        <p className="text-base md:text-xl text-deep-brown/70 max-w-2xl mx-auto">
                            {getPageSubtitle()}
                        </p>

                        <div className="flex justify-center gap-2 mt-8">
                            <button
                                onClick={() => setSelectedFilter('all')}
                                className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedFilter === 'all'
                                    ? 'bg-deep-brown text-white'
                                    : 'bg-deep-brown/10 text-deep-brown hover:bg-deep-brown/20'
                                    }`}
                            >
                                {t('all')}
                            </button>
                            <button
                                onClick={() => { setSelectedFilter('bestseller'); setSortBy('bestseller'); }}
                                className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedFilter === 'bestseller'
                                    ? 'bg-warm-sand text-white'
                                    : 'bg-warm-sand/20 text-deep-brown hover:bg-warm-sand/30'
                                    }`}
                            >
                                🔥 {t('bestseller')}
                            </button>
                            <button
                                onClick={() => { setSelectedFilter('new'); setSortBy('newest'); }}
                                className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedFilter === 'new'
                                    ? 'bg-deep-brown text-white'
                                    : 'bg-deep-brown/10 text-deep-brown hover:bg-deep-brown/20'
                                    }`}
                            >
                                ✨ {t('new')}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="sticky top-16 z-40 bg-white border-b border-deep-brown/10 shadow-sm">
                <div className="w-full px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto py-3 md:py-4">
                    <div className="md:hidden space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-2 py-2 text-xs border border-deep-brown/20 rounded-md bg-white"
                            >
                                <option value="all">{t('allCategories')}</option>
                                <option value="men">{t('men')}</option>
                                <option value="women">{t('women')}</option>
                                <option value="kids">{t('kids')}</option>
                            </select>

                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="px-2 py-2 text-xs border border-deep-brown/20 rounded-md bg-white"
                            >
                                <option value="all">{t('allTypes')}</option>
                                <option value="sandal">{t('sandal')}</option>
                                <option value="sepatu">{t('sepatu')}</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-2 py-2 text-xs border border-deep-brown/20 rounded-md bg-white"
                            >
                                <option value="bestseller">{t('sortBestseller')}</option>
                                <option value="cheapest">{t('sortCheapest')}</option>
                                <option value="newest">{t('sortNewest')}</option>
                                <option value="nameAsc">{t('sortNameAsc')}</option>
                                <option value="nameDesc">{t('sortNameDesc')}</option>
                            </select>

                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-2 py-2 text-xs border border-deep-brown/20 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="hidden md:flex gap-4 items-center">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-3 py-2 text-base border border-deep-brown/20 rounded-md bg-white"
                        >
                            <option value="all">{t('allCategories')}</option>
                            <option value="men">{t('men')}</option>
                            <option value="women">{t('women')}</option>
                            <option value="kids">{t('kids')}</option>
                        </select>

                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="px-3 py-2 text-base border border-deep-brown/20 rounded-md bg-white"
                        >
                            <option value="all">{t('allTypes')}</option>
                            <option value="sandal">{t('sandal')}</option>
                            <option value="sepatu">{t('sepatu')}</option>
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 text-base border border-deep-brown/20 rounded-md bg-white"
                        >
                            <option value="bestseller">{t('sortBestseller')}</option>
                            <option value="cheapest">{t('sortCheapest')}</option>
                            <option value="newest">{t('sortNewest')}</option>
                            <option value="nameAsc">{t('sortNameAsc')}</option>
                            <option value="nameDesc">{t('sortNameDesc')}</option>
                        </select>

                        <div className="flex-1 min-w-[200px]">
                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-3 py-2 text-base border border-deep-brown/20 rounded-md"
                            />
                        </div>

                        <div className="text-sm text-deep-brown/60 whitespace-nowrap">
                            {sortedProducts.length} {t('products')}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12" ref={ref}>
                <div className="w-full px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto">
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
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                                {displayedProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </div>

                            {hasMore && (
                                <div className="text-center mt-12">
                                    <button
                                        onClick={() => setDisplayCount(displayCount + 8)}
                                        className="px-8 py-3 border-2 border-deep-brown text-deep-brown font-semibold rounded-md hover:bg-deep-brown hover:text-white transition-all"
                                    >
                                        {t('loadMore')} ({sortedProducts.length - displayCount} {t('moreProducts')})
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

export default function CatalogClient() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CatalogContent />
        </Suspense>
    );
}
