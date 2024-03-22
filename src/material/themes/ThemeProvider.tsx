'use client';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import { CssBaseline, createTheme } from '@mui/material';
import { ReactNode, useCallback, useEffect, useState } from 'react';
// import overrides from "../overrides";
import { themes } from './theme';
import { Theme } from '@/models/Theme';
import { ThemeContext, useDarkTheme } from '@/contexts/ThemeContext';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const shouldUseDarkTheme = useDarkTheme();
  const [theme, setTheme] = useState<Theme>({ theme: createTheme(), name: 'Default' });

  const mutate = useCallback(() => {
    let themeToUse: Theme | undefined;
    const localStoreTheme = localStorage.getItem('theme');
    switch (localStoreTheme) {
      case 'Dark':
        themeToUse = themes.Dark;
        break;
      case 'Light':
        themeToUse = themes.Light;
        break;
      default:
        themeToUse = undefined;
        break;
    }

    if (!themeToUse) {
      themeToUse = {
        theme: shouldUseDarkTheme ? themes.Dark.theme : themes.Light.theme,
        name: 'Auto',
      };
    }

    setTheme(themeToUse);
  }, [shouldUseDarkTheme]);

  useEffect(() => {
    mutate();
  }, [mutate, shouldUseDarkTheme]);

  if (theme.name === 'Default') {
    return null;
  }

  return (
    <AppRouterCacheProvider>
      <ThemeContext.Provider value={{ theme, setTheme, mutate }}>
        <ThemeContext.Consumer>
          {({ theme: currentTheme }) => (
            <MUIThemeProvider theme={currentTheme.theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline enableColorScheme />
              {children}
            </MUIThemeProvider>
          )}
        </ThemeContext.Consumer>
      </ThemeContext.Provider>
    </AppRouterCacheProvider>
  );
}
