import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Sitemap {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/',
        },
        sitemap: 'https://new-mc-website.vercel.app/sitemap.xml',
    };
}
