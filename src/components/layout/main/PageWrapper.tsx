import { ReactNode } from 'react';
import { Box } from '@mui/material';
import SearchFieldProvider from '@components/search/searchField/SearchFieldProvider';
import Header from '../header/Header';
import Footer from '../footer/Footer';

type PageWrapperProps = {
  children: ReactNode;
  disableHeader?: boolean;
  disableFooter?: boolean;
};

export default function PageWrapper(props: PageWrapperProps) {
  const { children, disableHeader, disableFooter } = props;

  return (
    <>
      <Box minHeight="100vh">
        <SearchFieldProvider>
          {disableHeader ? null : <Header />}
          <Box component="main">{children}</Box>
        </SearchFieldProvider>
      </Box>
      {disableFooter ? null : <Footer />}
    </>
  );
}
