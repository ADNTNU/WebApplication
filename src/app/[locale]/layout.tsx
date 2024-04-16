import { ReactNode } from 'react';
import { Locale, locales } from '@/internationalization/i18n';
import { unstable_setRequestLocale } from 'next-intl/server';
import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import 'dayjs/locale/en';
import FlightFinderCssVarsProvider from '@components/layout/FlightFinderCssVarsProvider';
import SearchFieldProvider from '@components/search/searchField/SearchFieldProvider';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  switch (locale) {
    case 'en':
      dayjs.locale('en');
      break;
    case 'nb':
      dayjs.locale('nb');
      break;
    default:
      // eslint-disable-next-line no-case-declarations
      const compileTimeCheck: never = locale;
      console.error(`Unhandled locale: ${compileTimeCheck}`);
      break;
  }
  // TODO: Make sure NextIntlClientProvider is not commented out in the final version
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={pick(messages, ['Error', 'Nav'])}>
          <FlightFinderCssVarsProvider locale={locale}>
            <SearchFieldProvider>{children}</SearchFieldProvider>
          </FlightFinderCssVarsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
