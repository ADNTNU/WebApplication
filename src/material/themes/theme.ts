'use client';

import {
  // createTheme as MUIcreateTheme,
  responsiveFontSizes,
  experimental_extendTheme as extendTheme,
  Theme as MUITheme,
} from '@mui/material/styles';
import breakpoints from './breakpoints';
import overrides from './overrides';
import darkThemeOptions from './darkTheme';
import lightThemeOptions from './lightTheme';

// export default function createTheme(ffTheme: ThemeOptionsWithName): Theme {
//   const { name, ...restTheme } = ffTheme;

//   let theme = MUIcreateTheme({
//     breakpoints: {
//       ...breakpoints,
//     },
//   });

//   theme = MUIcreateTheme(theme, {
//     typography: {
//       h6: {
//         fontWeight: 400,
//       },
//     },
//     ...restTheme,
//   });

//   theme = responsiveFontSizes(theme, { breakpoints: ['sm', 'md', 'lg', 'xl'], factor: 2 });

//   theme.components = overrides(theme);

//   return {
//     name,
//     theme,
//   };
// }

export function createCommonTheme() {
  const themeOpts = {
    colorSchemes: {
      light: {
        palette: lightThemeOptions.palette,
      },
      dark: {
        palette: darkThemeOptions.palette,
      },
    },
    breakpoints: {
      ...breakpoints,
    },
  };

  let theme = extendTheme();

  theme = extendTheme(
    {
      ...themeOpts,
      components: {
        ...overrides(theme),
      },
      breakpoints,
    },
    [
      // theme,
      responsiveFontSizes(theme as MUITheme, { breakpoints: ['sm', 'md', 'lg', 'xl'], factor: 2 }),
    ],
  );

  return theme;
}

export const commonTheme = createCommonTheme();

// const darkTheme = createTheme(darkThemeOptions);
// const lightTheme = createTheme(lightThemeOptions);
// export const themes: { [K in ThemeMode]: Theme } = {
//   Dark: darkTheme,
//   Light: lightTheme,
// };
