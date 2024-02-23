import pick from 'lodash/pick';
import { ReactNode } from 'react';
import ThemeProvider from '@material/themes';
import { locales } from '@/i18n';
import { NextIntlClientProvider, useMessages } from 'next-intl';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={pick(messages, ['Error', 'Nav'])}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
