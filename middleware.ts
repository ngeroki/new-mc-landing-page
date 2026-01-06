import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export const runtime = 'experimental-edge';

export default createMiddleware({
    ...routing,
    // Always use locale prefix in the URL
    localePrefix: 'always',
    // Disable locale detection to force defaultLocale (id)
    localeDetection: false
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(id|en)/:path*']
};

