import { ReactNode } from 'react';
import { Locale, locales } from '@/internationalization/i18n';
import { unstable_setRequestLocale } from 'next-intl/server';
import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import FlightFinderCssVarsProvider from '@components/layout/FlightFinderCssVarsProvider';
import AuthProvider from '@components/login/AuthProvider';
import SearchFieldProvider from '@components/search/searchField/SearchFieldProvider';
import setDayjsLocale from '@internationalization/utils/setDayjsLocale';

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
  setDayjsLocale(locale);

  // TODO: Make sure NextIntlClientProvider is not commented out in the final version
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        {/* </NextIntlClientProvider> */}
        <NextIntlClientProvider
          locale={locale}
          messages={pick(messages, ['error', 'nav', 'locale'])}
        >
          <SearchFieldProvider>
            <FlightFinderCssVarsProvider locale={locale}>
              <AuthProvider>{children}</AuthProvider>
            </FlightFinderCssVarsProvider>
          </SearchFieldProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
