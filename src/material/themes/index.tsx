import { ThemeProvider as MyThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import { CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
// import overrides from "../overrides";
import theme from './theme';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <MyThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </MyThemeProvider>
    </AppRouterCacheProvider>
  );
}
