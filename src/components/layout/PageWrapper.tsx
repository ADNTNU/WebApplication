import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { Locale } from '@/i18n';

type PageWrapperProps = {
  children: ReactNode;
  disableHeader?: boolean;
  disableFooter?: boolean;
  locale?: Locale;
};

export default function PageWrapper(props: PageWrapperProps) {
  const { children, disableHeader, disableFooter, locale } = props;

  return (
    <>
      <Box minHeight="100vh">
        {disableHeader ? null : <Header locale={locale} />}
        <Box component="main">{children}</Box>
      </Box>
      {disableFooter ? null : <Footer />}
    </>
  );
}
