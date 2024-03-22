'use client';

import { createTheme as MUIcreateTheme, responsiveFontSizes } from '@mui/material/styles';
import breakpoints from './breakpoints';
import overrides from './overrides';
import darkThemeOptions from './darkTheme';
import lightThemeOptions from './lightTheme';
import { Theme, ThemeMode, ThemeOptionsWithName } from '@/models/Theme';

export default function createTheme(ffTheme: ThemeOptionsWithName): Theme {
  const { name, ...restTheme } = ffTheme;

  let theme = MUIcreateTheme({
    breakpoints: {
      ...breakpoints,
    },
  });

  theme = MUIcreateTheme(theme, {
    typography: {
      h6: {
        fontWeight: 400,
      },
    },
    ...restTheme,
  });

  theme = responsiveFontSizes(theme, { breakpoints: ['sm', 'md', 'lg', 'xl'], factor: 2 });

  theme.components = overrides(theme);

  return {
    name,
    theme,
  };
}

const darkTheme = createTheme(darkThemeOptions);
const lightTheme = createTheme(lightThemeOptions);
export const themes: { [K in ThemeMode]: Theme } = {
  Dark: darkTheme,
  Light: lightTheme,
};
