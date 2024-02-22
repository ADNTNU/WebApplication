import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

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
        {disableHeader ? null : <Header />}
        <Box component="main">{children}</Box>
      </Box>
      {disableFooter ? null : <Footer />}
    </>
  );
}
