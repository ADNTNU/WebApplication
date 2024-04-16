import { ComponentProps, ReactNode } from 'react';
import { Box } from '@mui/material';
import SearchFieldProvider from '@components/search/searchField/SearchFieldProvider';
import Header from '../header/Header';
import Footer from '../footer/Footer';

type PageWrapperProps = {
  children: ReactNode;
  disableHeader?: boolean;
  disableFooter?: boolean;
  rootProps?: ComponentProps<typeof Box>;
  mainProps?: ComponentProps<typeof Box>;
  // headerProps?: ComponentProps<typeof Header>;
  // footerProps?: ComponentProps<typeof Footer>;
};

export default function PageWrapper(props: PageWrapperProps) {
  const {
    children,
    disableHeader,
    disableFooter,
    rootProps,
    mainProps /* , headerProps, footerProps */,
  } = props;
  const { minHeight = '100vh', ...rootRestProps } = rootProps || {};
  const { component = 'main', ...mainRestProps } = mainProps || {};

  if (disableHeader && disableFooter) {
    // Merging rootProps with mainProps when both header and footer are disabled
    const combinedProps = {
      minHeight,
      component,
      ...rootRestProps,
      ...mainRestProps,
    };

    return (
      <SearchFieldProvider>
        <Box {...combinedProps}>{children}</Box>;
      </SearchFieldProvider>
    );
  }
  return (
    <SearchFieldProvider>
      <Box minHeight={minHeight} {...rootRestProps}>
        {disableHeader ? null : <Header /* {...headerProps} */ />}
        <Box
          component={component}
          minHeight={disableHeader && disableFooter ? minHeight : undefined}
          {...mainRestProps}
        >
          {children}
        </Box>
      </Box>
      {disableFooter ? null : <Footer /* {...footerProps} */ />}
    </SearchFieldProvider>
  );
}
