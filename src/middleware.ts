import createMiddleware from 'next-intl/middleware';
import { locales } from '@/internationalization/i18n';
import { localePrefix, pathnames } from '@/internationalization/navigation';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Custom pathnames for each locale
  pathnames,
  localePrefix,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/(en|nb)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
