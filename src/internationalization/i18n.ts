import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config

export const locales = ['en', 'nb'] as const;
export type LocaleTuple = typeof locales;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  // Validate that the incoming `locale` parameter is valid on runtime
  const typedLocale = locale as Locale;
  if (!locales.includes(typedLocale)) {
    console.error(`Invalid locale: ${locale}`);
    notFound();
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
