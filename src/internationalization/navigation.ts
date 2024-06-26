import { createLocalizedPathnamesNavigation, Pathnames } from 'next-intl/navigation';
import { locales } from '@/internationalization/i18n';
import { ComponentProps } from 'react';
import { LocalePrefix } from 'next-intl/dist/types/src/shared/types';

export const localePrefix: LocalePrefix | undefined = 'as-needed';

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  '/': '/',

  // If locales use different paths, you can
  // specify each external path per locale.
  '/about': {
    en: '/about',
    nb: '/om-oss',
  },

  '/search': {
    en: '/search',
    nb: '/sok',
  },

  '/privacy': {
    en: '/privacy',
    nb: '/personvern',
  },

  '/trip/[tripId]': {
    en: '/trip/[tripId]',
    nb: '/flytur/[tripId]',
  },

  '/signup': {
    en: '/signup',
    nb: '/registrer',
  },

  '/login': {
    en: '/login',
    nb: '/innlogging',
  },

  '/controlpanel': {
    en: '/controlpanel',
    nb: '/kontrollpanel',
  },

  '/redirect': {
    en: '/redirect',
    nb: '/omdirigere',
  },

  // Dynamic params are supported via square brackets
  // '/news/[articleSlug]-[articleId]': {
  //   en: '/news/[articleSlug]-[articleId]',
  //   nb: '/neuigkeiten/[articleSlug]-[articleId]'
  // },

  // Also (optional) catch-all segments are supported
  // '/categories/[...slug]': {
  //   en: '/categories/[...slug]',
  //   de: '/kategorien/[...slug]'
  // }
} satisfies Pathnames<typeof locales>;

export const {
  Link: I18nLink,
  redirect,
  usePathname,
  useRouter,
  getPathname,
  permanentRedirect,
} = createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });

export type Pathname = keyof typeof pathnames;

export type LinkProps = ComponentProps<typeof I18nLink<Pathname>>;

export type SafeHref = LinkProps['href'];
