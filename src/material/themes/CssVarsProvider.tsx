import { Experimental_CssVarsProvider as MUICssVarsProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import getInitColorSchemeScript from '@mui/system/cssVars/getInitColorSchemeScript';
import { commonTheme } from './theme';

type CssVarsProviderProps = {
  children: ReactNode;
};

export default function CssVarsProvider({ children }: CssVarsProviderProps) {
  const theme = commonTheme;

  return (
    <AppRouterCacheProvider>
      <MUICssVarsProvider theme={theme} defaultMode="system">
        <CssBaseline enableColorScheme />
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {/* {getInitColorSchemeScript()} */}
        {getInitColorSchemeScript({
          // These properties are normally set when importing from @mui/material,
          // but we have to set manually because we are importing from @mui/system.
          attribute: 'data-mui-color-scheme',
          modeStorageKey: 'mui-mode',
          colorSchemeStorageKey: 'mui-color-scheme',
          // All options that you pass to CssVarsProvider you should also pass here.
          defaultMode: 'system',
        })}
        {children}
      </MUICssVarsProvider>
    </AppRouterCacheProvider>
  );
}
