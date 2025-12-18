import { MetadataRoute } from 'next';
import { products } from '@/app/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://new-mc-website.vercel.app';
    const locales = ['id', 'en'];
    const staticPages = ['', '/catalog', '/about', '/contact'];

    // Generate static page entries for each locale
    const staticEntries = locales.flatMap((locale) =>
        staticPages.map((page) => ({
            url: `${baseUrl}/${locale}${page}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: page === '' ? 1 : 0.8,
        }))
    );

    // Generate product page entries for each locale
    const productEntries = locales.flatMap((locale) =>
        products.map((product) => ({
            url: `${baseUrl}/${locale}/catalog/${encodeURIComponent(product.id)}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))
    );

    return [...staticEntries, ...productEntries];
}
