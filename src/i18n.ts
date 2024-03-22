import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import 'dayjs/locale/en';

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

  switch (typedLocale) {
    case 'en':
      dayjs.locale('en');
      break;
    case 'nb':
      dayjs.locale('nb');
      break;
    default:
      const compileTimeCheck: never = typedLocale;
      console.error(`Unhandled locale: ${compileTimeCheck}`);
      break;
  }

  return {
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
