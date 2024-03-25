import { ReactNode } from 'react';
import { Locale, locales } from '@/internationalization/i18n';
import { unstable_setRequestLocale } from 'next-intl/server';
// import { pick } from 'lodash';
// import { NextIntlClientProvider, useMessages } from 'next-intl';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import 'dayjs/locale/en';
import CssVarsProvider from '@material/themes/CssVarsProvider';
import getInitColorSchemeScript from '@mui/system/cssVars/getInitColorSchemeScript';

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
  // const messages = useMessages();

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

  return (
    <html lang={locale}>
      <body>
        {/* <NextIntlClientProvider locale={locale} messages={pick(messages, ['Error', 'Nav'])}> */}
        {getInitColorSchemeScript({
          // These properties are normally set when importing from @mui/material,
          // but we have to set manually because we are importing from @mui/system.
          attribute: 'data-mui-color-scheme',
          modeStorageKey: 'mui-mode',
          colorSchemeStorageKey: 'mui-color-scheme',
          // All options that you pass to CssVarsProvider you should also pass here.
          defaultMode: 'system',
        })}
        <CssVarsProvider>{children}</CssVarsProvider>
        {/* </NextIntlClientProvider> */}
      </body>
    </html>
  );
}
