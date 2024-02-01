import { ReactNode } from 'react';
import ThemeProvider from '@material/themes';
import { locales } from '@/i18n';
import { getTranslations } from 'next-intl/server';

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

// export async function generateMetadata({
//   params: {locale}
// } : { params: {locale: string}; }) {
//   const t = await getTranslations({locale, namespace: 'LocaleLayout'});

//   return {
//     title: t('title')
//   };
// }

export default function LocaleLayout({
  children,
  params: {locale}
}: {
  children: ReactNode;
  params: {locale: string};
}) {
  return (
    <html lang={locale}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}