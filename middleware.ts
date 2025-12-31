import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export const runtime = 'edge';

export default createMiddleware({
    ...routing,
    // Always use locale prefix in the URL
    localePrefix: 'always',
    // Detect locale from accept-language header
    localeDetection: true
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(id|en)/:path*']
};

